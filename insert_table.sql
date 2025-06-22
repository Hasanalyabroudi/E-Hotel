-- Insert Hotel Chains
INSERT INTO HotelChain (Name, Address, PhoneNumber, Email) VALUES
('Oceanic Views', '123 Sea Street', 1234567890, 'contact@oceanicviews.com'),
('Garden Inns', '456 Garden Road', 2345678901, 'info@gardeninns.com'),
('CityScape Hotels', '789 City Ave', 3456789012, 'support@cityscapehotels.com'),
('Beachfront Resorts', '101 Beach Blvd', 4567890123, 'reservations@beachfrontresorts.com'),
('Mountain Peaks', '202 Mountain Trail', 5678901234, 'bookings@mountainpeaks.com');

-- Inserting hotels for Oceanic Views ChainID = 1
INSERT INTO Hotel (Name, Address, PhoneNumber, Email, Rating, ChainID) VALUES
('Oceanic Views Seaside', '100 Ocean Drive, Seaside', 1112223333, 'seaside@oceanicviews.com', 5, 1),
('Oceanic Views Beachfront', '200 Ocean Drive, Seaside', 1112224444, 'beachfront@oceanicviews.com', 4, 1),
('Oceanic Views Harbor', '100 Harbor Lane, Bay City', 1112225555, 'harbor@oceanicviews.com', 4, 1),
('Oceanic Views Downtown', '300 City Center, Bay City', 1112226666, 'downtown@oceanicviews.com', 5, 1),
('Oceanic Views Cliffside', '400 Cliff Drive, Highland', 1112227777, 'cliffside@oceanicviews.com', 5, 1),
('Oceanic Views Riverside', '500 River Road, Highland', 1112228888, 'riverside@oceanicviews.com', 3, 1),
('Oceanic Views Parkside', '600 Park Ave, Greenfield', 1112229999, 'parkside@oceanicviews.com', 4, 1),
('Oceanic Views Lakeside', '700 Lake Road, Greenfield', 1112230000, 'lakeside@oceanicviews.com', 3, 1);


-- Inserting hotels for Garden Inns ChainID = 2
INSERT INTO Hotel (Name, Address, PhoneNumber, Email, Rating, ChainID) VALUES
('Garden Inn Downtown', '101 Garden Path, Metro City', 1122334455, 'downtown@gardeninns.com', 4, 2),
('Garden Inn Riverside', '102 River Street, Riverdale', 1122334466, 'riverside@gardeninns.com', 3, 2),
('Garden Inn Parkview', '103 Park Ave, Green Park', 1122334477, 'parkview@gardeninns.com', 5, 2),
('Garden Inn Eastside', '104 East Way, Sunnyside', 1122334488, 'eastside@gardeninns.com', 4, 2),
('Garden Inn Westside', '105 West Road, Sunnyside', 1122334499, 'westside@gardeninns.com', 4, 2),
('Garden Inn South Gardens', '106 South Lane, Southtown', 1122334400, 'southgardens@gardeninns.com', 3, 2),
('Garden Inn Northwoods', '107 North Street, Forestville', 1122334411, 'northwoods@gardeninns.com', 4, 2),
('Garden Inn Central', '108 Central Blvd, Metro City', 1122334422, 'central@gardeninns.com', 5, 2);

-- Inserting hotels for CityScape Hotels ChainID = 3
INSERT INTO Hotel (Name, Address, PhoneNumber, Email, Rating, ChainID) VALUES
('CityScape Grand', '201 City Square, Capital City', 2233445566, 'grand@cityscapehotels.com', 5, 3),
('CityScape Tower', '202 Tower Road, Capital City', 2233445577, 'tower@cityscapehotels.com', 5, 3),
('CityScape Metro', '203 Metro Street, Highline', 2233445588, 'metro@cityscapehotels.com', 4, 3),
('CityScape Riverside', '204 River Blvd, River City', 2233445599, 'riverside@cityscapehotels.com', 4, 3),
('CityScape East', '205 East End, Easton', 2233445500, 'east@cityscapehotels.com', 3, 3),
('CityScape West', '206 West Way, Westwood', 2233445511, 'west@cityscapehotels.com', 3, 3),
('CityScape North', '207 North Ave, Northridge', 2233445522, 'north@cityscapehotels.com', 4, 3),
('CityScape South', '208 South Street, Southline', 2233445533, 'south@cityscapehotels.com', 4, 3);

-- Inserting hotels for Beachfront Resorts ChainID = 4
INSERT INTO Hotel (Name, Address, PhoneNumber, Email, Rating, ChainID) VALUES
('Beachfront Bliss', '301 Beach Ave, Seashore', 3344556677, 'bliss@beachfrontresorts.com', 5, 4),
('Beachfront Sunset', '302 Sunset Blvd, Seashore', 3344556688, 'sunset@beachfrontresorts.com', 5, 4),
('Beachfront Paradise', '303 Paradise Lane, Coastal City', 3344556699, 'paradise@beachfrontresorts.com', 4, 4),
('Beachfront Cove', '304 Cove Street, Baytown', 3344556600, 'cove@beachfrontresorts.com', 4, 4),
('Beachfront Palms', '305 Palm Road, Coastal City', 3344556611, 'palms@beachfrontresorts.com', 3, 4),
('Beachfront Dunes', '306 Dune Drive, Dunesville', 3344556622, 'dunes@beachfrontresorts.com', 3, 4),
('Beachfront Waves', '307 Wave Way, Baytown', 3344556633, 'waves@beachfrontresorts.com', 4, 4),
('Beachfront Shoreline', '308 Shore Lane, Seashore', 3344556644, 'shoreline@beachfrontresorts.com', 4, 4);

-- Inserting hotels for Mountain Peaks ChainID = 5
INSERT INTO Hotel (Name, Address, PhoneNumber, Email, Rating, ChainID) VALUES
('Mountain Peaks Lodge', '401 Mountain Road, Highland', 4455667788, 'lodge@mountainpeaks.com', 5, 5),
('Mountain Peaks Retreat', '402 Retreat Ave, Highland', 4455667799, 'retreat@mountainpeaks.com', 5, 5),
('Mountain Peaks Vista', '403 Vista Lane, Mountainview', 4455667700, 'vista@mountainpeaks.com', 4, 5),
('Mountain Peaks Chalet', '404 Chalet Street, Snowtown', 4455667711, 'chalet@mountainpeaks.com', 4, 5),
('Mountain Peaks Alpine', '405 Alpine Road, Snowtown', 4455667722, 'alpine@mountainpeaks.com', 3, 5),
('Mountain Peaks Summit', '406 Summit Blvd, Mountainview', 4455667733, 'summit@mountainpeaks.com', 3, 5),
('Mountain Peaks Basecamp', '407 Basecamp Way, Highland', 4455667744, 'basecamp@mountainpeaks.com', 4, 5),
('Mountain Peaks Pinnacle', '408 Pinnacle Path, Snowtown', 4455667755, 'pinnacle@mountainpeaks.com', 4, 5);


-- Insert Rooms for each hotel
-- Assuming HotelID for 'Oceanic Views Downtown' is 1
INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(101, 150, 'WiFi, TV, Mini-fridge', 2, 'City View', FALSE, FALSE, 1),
(102, 200, 'WiFi, TV, Mini-fridge, Balcony', 2, 'Garden View', TRUE, FALSE, 1),
(103, 180, 'WiFi, TV, Sea view', 3, 'Sea View', FALSE, FALSE, 1),
(104, 250, 'WiFi, TV, Mini-fridge, Jacuzzi', 2, 'Garden View', TRUE, FALSE, 1),
(105, 300, 'WiFi, TV, Mini-fridge, Balcony, Sea view', 4, 'Sea View', TRUE, FALSE, 1);

-- Inserting rooms for Garden Inn Riverside (Assuming HotelID = 2)
INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(201, 120, 'WiFi, TV', 1, 'City View', FALSE, FALSE, 2),
(202, 170, 'WiFi, TV, Mini-fridge', 2, 'River View', FALSE, FALSE, 2),
(203, 220, 'WiFi, TV, Mini-fridge, Balcony', 3, 'River View', TRUE, FALSE, 2),
(204, 150, 'WiFi, TV, Mini-fridge', 2, 'City View', FALSE, FALSE, 2),
(205, 200, 'WiFi, TV, Balcony, River view', 2, 'River View', TRUE, FALSE, 2);

INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(301, 200, 'WiFi, TV, City View', 2, 'City View', FALSE, FALSE, 3),
(302, 250, 'WiFi, TV, Mini-bar', 2, 'City View', TRUE, FALSE, 3),
(303, 300, 'WiFi, TV, Mini-bar, Balcony', 3, 'City View', TRUE, FALSE, 3),
(304, 350, 'WiFi, TV, Mini-bar, Jacuzzi', 2, 'City View', TRUE, FALSE, 3),
(305, 400, 'WiFi, TV, Mini-bar, Balcony, Jacuzzi', 4, 'City View', TRUE, FALSE, 3);

INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(401, 180, 'WiFi, TV, Sea View', 2, 'Sea View', FALSE, FALSE, 4),
(402, 230, 'WiFi, TV, Mini-fridge, Sea View', 2, 'Sea View', TRUE, FALSE, 4),
(403, 280, 'WiFi, TV, Mini-fridge, Balcony, Sea View', 3, 'Sea View', TRUE, FALSE, 4),
(404, 330, 'WiFi, TV, Mini-fridge, Jacuzzi, Sea View', 2, 'Sea View', TRUE, FALSE, 4),
(405, 380, 'WiFi, TV, Mini-fridge, Balcony, Jacuzzi, Sea View', 4, 'Sea View', TRUE, FALSE, 4);

INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(501, 220, 'WiFi, TV, Sea View', 2, 'Sea View', FALSE, FALSE, 5),
(502, 270, 'WiFi, TV, Mini-bar, Sea View', 2, 'Sea View', TRUE, FALSE, 5),
(503, 320, 'WiFi, TV, Mini-bar, Balcony, Sea View', 3, 'Sea View', TRUE, FALSE, 5),
(504, 370, 'WiFi, TV, Mini-bar, Jacuzzi, Sea View', 2, 'Sea View', TRUE, FALSE, 5),
(505, 420, 'WiFi, TV, Mini-bar, Balcony, Jacuzzi, Sea View', 4, 'Sea View', TRUE, FALSE, 5);

INSERT INTO Room (RoomNumber, Price, Amenities, Capacity, RoomView, Extendable, Damages, HotelID) VALUES
(601, 190, 'WiFi, TV, Harbor View', 2, 'City View', FALSE, FALSE, 6),
(602, 240, 'WiFi, TV, Mini-fridge, Harbor View', 2, 'City View', TRUE, FALSE, 6),
(603, 290, 'WiFi, TV, Mini-fridge, Balcony, Harbor View', 3, 'City View', TRUE, FALSE, 6),
(604, 340, 'WiFi, TV, Mini-fridge, Jacuzzi, Harbor View', 2, 'City View', TRUE, FALSE, 6),
(605, 390, 'WiFi, TV, Mini-fridge, Balcony, Jacuzzi, Harbor View', 4, 'City View', TRUE, FALSE, 6);
