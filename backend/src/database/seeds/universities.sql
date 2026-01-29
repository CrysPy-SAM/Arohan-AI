-- Sample Universities Data
INSERT INTO universities (name, country, ranking, programs, tuition_fee_min, tuition_fee_max, living_cost, min_gpa, min_ielts, min_gre, acceptance_rate, application_deadline, website) VALUES

-- USA Universities
('Massachusetts Institute of Technology', 'USA', 1, '[{"name":"MS Computer Science","duration":"2 years"}]', 50000, 55000, 20000, 3.7, 7.0, 320, 0.07, 'December 15', 'https://web.mit.edu'),
('Stanford University', 'USA', 2, '[{"name":"MS Computer Science","duration":"2 years"}]', 52000, 57000, 22000, 3.8, 7.5, 325, 0.04, 'December 1', 'https://www.stanford.edu'),
('Carnegie Mellon University', 'USA', 3, '[{"name":"MS Computer Science","duration":"2 years"}]', 48000, 53000, 18000, 3.6, 7.0, 318, 0.15, 'December 10', 'https://www.cmu.edu'),
('University of California, Berkeley', 'USA', 4, '[{"name":"MS Computer Science","duration":"2 years"}]', 28000, 32000, 20000, 3.5, 7.0, 315, 0.18, 'December 15', 'https://www.berkeley.edu'),
('Georgia Institute of Technology', 'USA', 8, '[{"name":"MS Computer Science","duration":"2 years"}]', 25000, 30000, 15000, 3.3, 6.5, 310, 0.35, 'January 1', 'https://www.gatech.edu'),
('University of Texas at Austin', 'USA', 12, '[{"name":"MS Computer Science","duration":"2 years"}]', 22000, 27000, 14000, 3.2, 6.5, 308, 0.45, 'December 15', 'https://www.utexas.edu'),
('Arizona State University', 'USA', 38, '[{"name":"MS Computer Science","duration":"2 years"}]', 18000, 22000, 12000, 3.0, 6.0, 300, 0.65, 'January 15', 'https://www.asu.edu'),

-- UK Universities
('University of Oxford', 'UK', 5, '[{"name":"MSc Computer Science","duration":"1 year"}]', 35000, 40000, 15000, 3.7, 7.5, NULL, 0.08, 'January 6', 'https://www.ox.ac.uk'),
('University of Cambridge', 'UK', 6, '[{"name":"MPhil Advanced Computer Science","duration":"1 year"}]', 36000, 41000, 16000, 3.8, 7.5, NULL, 0.06, 'December 1', 'https://www.cam.ac.uk'),
('Imperial College London', 'UK', 7, '[{"name":"MSc Computing","duration":"1 year"}]', 34000, 38000, 15000, 3.5, 7.0, NULL, 0.12, 'January 15', 'https://www.imperial.ac.uk'),
('University College London', 'UK', 9, '[{"name":"MSc Computer Science","duration":"1 year"}]', 32000, 36000, 14000, 3.4, 6.5, NULL, 0.25, 'January 31', 'https://www.ucl.ac.uk'),
('University of Edinburgh', 'UK', 15, '[{"name":"MSc Computer Science","duration":"1 year"}]', 28000, 32000, 12000, 3.2, 6.5, NULL, 0.40, 'February 1', 'https://www.ed.ac.uk'),
('University of Manchester', 'UK', 27, '[{"name":"MSc Advanced Computer Science","duration":"1 year"}]', 25000, 28000, 11000, 3.0, 6.5, NULL, 0.55, 'July 31', 'https://www.manchester.ac.uk'),

-- Canada Universities
('University of Toronto', 'Canada', 18, '[{"name":"MScAC Applied Computing","duration":"2 years"}]', 30000, 35000, 12000, 3.5, 7.0, NULL, 0.20, 'December 15', 'https://www.utoronto.ca'),
('University of British Columbia', 'Canada', 34, '[{"name":"MSc Computer Science","duration":"2 years"}]', 28000, 32000, 11000, 3.3, 6.5, NULL, 0.35, 'December 1', 'https://www.ubc.ca'),
('University of Waterloo', 'Canada', 42, '[{"name":"MMath Computer Science","duration":"2 years"}]', 26000, 30000, 10000, 3.3, 7.0, NULL, 0.30, 'January 15', 'https://uwaterloo.ca'),
('McGill University', 'Canada', 31, '[{"name":"MSc Computer Science","duration":"2 years"}]', 24000, 28000, 10000, 3.2, 6.5, NULL, 0.45, 'January 15', 'https://www.mcgill.ca'),

-- Australia Universities
('Australian National University', 'Australia', 29, '[{"name":"Master of Computing","duration":"2 years"}]', 35000, 40000, 15000, 3.0, 6.5, NULL, 0.50, 'March 31', 'https://www.anu.edu.au'),
('University of Melbourne', 'Australia', 33, '[{"name":"Master of Information Technology","duration":"2 years"}]', 36000, 41000, 16000, 3.2, 6.5, NULL, 0.45, 'March 31', 'https://www.unimelb.edu.au'),
('University of Sydney', 'Australia', 41, '[{"name":"Master of Information Technology","duration":"2 years"}]', 34000, 38000, 15000, 3.0, 6.5, NULL, 0.55, 'April 30', 'https://www.sydney.edu.au');