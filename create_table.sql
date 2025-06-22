-- Create HotelChain Table
CREATE TABLE HotelChain (
    ChainID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    PhoneNumber INTEGER NOT NULL,
    Email VARCHAR(255) NOT NULL CHECK (Email ~* '^.+@.+\..+$') -- Simple regex for email validation
);

-- Create Hotel Table
CREATE TABLE Hotel (
    HotelID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    PhoneNumber INTEGER NOT NULL,
    Email VARCHAR(255) NOT NULL CHECK (Email ~* '^.+@.+\..+$'), -- Simple regex for email validation
    Rating INTEGER CHECK (Rating <= 5),
    ChainID INTEGER REFERENCES HotelChain(ChainID)
);

-- Create Room Table
CREATE TABLE Room (
    RoomNumber INTEGER PRIMARY KEY,
    Price INTEGER NOT NULL,
    Amenities TEXT NOT NULL,
    Capacity INTEGER NOT NULL,
    RoomView VARCHAR(255) NOT NULL,
    Extendable BOOLEAN NOT NULL,
    Damages BOOLEAN NOT NULL,
    HotelID INTEGER REFERENCES Hotel(HotelID)
);

-- Create Customer Table
CREATE TABLE Customer (
    SIN INTEGER PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address TEXT NOT NULL,
    RegistrationDate TEXT NOT NULL,
    Password VARCHAR(255) -- Allowing NULL for password
);

-- Create Employee Table
CREATE TABLE Employee (
    SIN INTEGER PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    HotelID INTEGER REFERENCES Hotel(HotelID),
    Password VARCHAR(255) NOT NULL
);

-- Create Booking Table
CREATE TABLE Booking (
    BookingID SERIAL PRIMARY KEY,
    RegisterDate TEXT NOT NULL,
    StartDate TEXT NOT NULL,
    EndDate TEXT NOT NULL,
    CustomerSIN INTEGER REFERENCES Customer(SIN),
    RoomNumber INTEGER REFERENCES Room(RoomNumber),
    EmployeeSIN INTEGER REFERENCES Employee(SIN)
);

-- Create Rental Table
CREATE TABLE Rental (
    RentalID SERIAL PRIMARY KEY,
    BookingID INTEGER REFERENCES Booking(BookingID),
    CheckInDate TEXT NOT NULL,
    CheckOutDate TEXT NOT NULL,
    CustomerSIN INTEGER REFERENCES Customer(SIN),
    RoomNumber INTEGER REFERENCES Room(RoomNumber),
    EmployeeSIN INTEGER REFERENCES Employee(SIN)
);

-- Create Archive Table
CREATE TABLE Archive (
    ArchiveID SERIAL PRIMARY KEY,
    Type VARCHAR(255) NOT NULL,
    BookingID INTEGER,
    CustomerSIN INTEGER NOT NULL REFERENCES Customer(SIN),
    RentalID INTEGER,
    RoomNumber INTEGER NOT NULL REFERENCES Room(RoomNumber)
);

--- Index 1 --------------------------------
CREATE INDEX idx_hotel_chainid ON Hotel(ChainID); 
--Justification: Justification: Hotels are often queried by their hotel chain to retrieve all hotels belonging to a specific chain. 
--An index on the ChainID column in the Hotel table will speed up these queries by allowing the database to quickly locate all hotels associated with a given chain. 
--This is particularly useful for aggregate operations, such as counting the number of hotels in each chain or retrieving average ratings across hotels in the same chain.

--- Index 2 --------------------------------
CREATE INDEX idx_booking_dates ON Booking(StartDate, EndDate);
--Justification: Bookings are frequently queried based on date ranges, such as finding all bookings within a specific period. 
--An index that includes both the StartDate and EndDate columns can significantly accelerate these queries by efficiently filtering bookings that overlap with or fall within the queried date range. 
--This type of index is beneficial for generating reports on occupancy rates, planning for future capacity, and analyzing booking trends over time.

--- Index 3 --------------------------------
CREATE INDEX idx_customer_name_sin ON Customer(Name, SIN);
--Justification: Customer information is often accessed through searches by customer name for customer service purposes or by SIN when processing bookings and rentals. 
--An index that includes both the Name and SIN columns can expedite searches by either field, improving response times for operations that involve customer lookup. 
--This composite index supports efficient access patterns whether users are searching for customers by name (e.g., for customer support inquiries) or by SIN (e.g., when validating customer identities during booking).

--- Trigger 1 --------------------------------
CREATE OR REPLACE FUNCTION archive_deleted_booking()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO Archive (Type, BookingID, CustomerSIN, RoomNumber)
  VALUES ('Booking', OLD.BookingID, OLD.CustomerSIN, OLD.RoomNumber);
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_archive_booking
BEFORE DELETE ON Booking
FOR EACH ROW EXECUTE FUNCTION archive_deleted_booking();

---- Trigger 2 ---------------------------------------
CREATE OR REPLACE FUNCTION archive_completed_rentals()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.EndDate < CURRENT_DATE THEN
    INSERT INTO Archive(bookingID, customerSIN, roomNumber, startDate, endDate)
    VALUES (NEW.bookingID, NEW.customerSIN, NEW.roomNumber, NEW.startDate, NEW.endDate);
    
    DELETE FROM Rental WHERE bookingID = NEW.bookingID;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_archive_rental
AFTER UPDATE ON Rental
FOR EACH ROW EXECUTE FUNCTION archive_completed_rentals();


---- View 1: Number of Available Rooms per Area ----------------------------------------------------
CREATE VIEW AvailableRoomsPerArea AS
SELECT
    h.Address AS Area,
    COUNT(r.RoomNumber) AS AvailableRoomCount
FROM
    Room r
JOIN Hotel h ON r.HotelID = h.HotelID
LEFT JOIN Booking b ON r.RoomNumber = b.RoomNumber AND CURRENT_DATE BETWEEN b.StartDate AND b.EndDate
LEFT JOIN Rental rt ON r.RoomNumber = rt.RoomNumber AND CURRENT_DATE BETWEEN rt.CheckInDate AND rt.CheckOutDate
WHERE
    r.Damages = FALSE  -- Assuming a room is available if it's not damaged
    AND b.BookingID IS NULL  -- No overlapping booking
    AND rt.RentalID IS NULL  -- No overlapping rental
GROUP BY
    h.Address;


---- View 2: Capacity of All the Rooms of a Specific Hotel -----------------------------------------
CREATE VIEW HotelRoomCapacities AS
SELECT
    h.HotelID,
    h.Name AS HotelName,
    SUM(r.Capacity) AS TotalRoomCapacity
FROM
    Room r
JOIN Hotel h ON r.HotelID = h.HotelID
GROUP BY
    h.HotelID, h.Name;
