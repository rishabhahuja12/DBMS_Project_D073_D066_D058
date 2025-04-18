create database skinfluence;
use skinfluence;

create table doctor(doctorid int primary key, first_name varchar(50), last_name varchar(50), email varchar(100), contactnumber varchar(15), specialisation varchar(100), yearsofexperience int, credentials varchar(200));
desc doctor;


create table patient(patientid int primary key, first_name varchar(50), last_name varchar(50), age int, dob date, contactnumber varchar(15), email varchar(100), gender varchar(10));
desc patient;


create table patient_address(patientid int, street varchar(100), city varchar(50), foreign key(patientid) references patient(patientid));
desc patient_address;


create table medicine(medicineid int primary key, medicinename varchar(100), description text, price decimal(10,2), stock int);
desc medicine;


create table order_table(orderid int primary key, totalamount decimal(10,2), orderdate date, orderstatus varchar(50));
desc order_table;


create table clinic(clinicid int primary key, clinicemail varchar(100), clinicname varchar(100), city varchar(50), street varchar(100), phonenumber varchar(15));
desc clinic;



create table appointment(appointmentid int primary key, date date, time time, status varchar(50));
desc appointment;


create table payment(paymentid int primary key, amount decimal(10,2), paymentdate date, transactionid varchar(100), orderid int, paymentmethod varchar(50), foreign key(orderid) references order_table(orderid));
desc payment;


create table medical_record(recordid int primary key, diagnosis varchar(255), visitdate date, treatment text);
desc medical_record;


create table test_report(recordid int, testtype varchar(100), testresult varchar(255), testdate date, primary key(recordid, testtype), foreign key(recordid) references medical_record(recordid));
desc test_report;


create table prescription(prescriptionid int primary key, dosage varchar(100), issuedate date);
desc prescription;


create table prescription_medicine(prescriptionid int, medicineid int, quantity int, primary key(prescriptionid, medicineid), foreign key(prescriptionid) references prescription(prescriptionid), foreign key(medicineid) references medicine(medicineid));
desc prescription_medicine;


create table patient_medical_history(patientid int, medical_condition varchar(100), diagnoseddate date, currentstatus varchar(100), primary key(patientid, medical_condition, diagnoseddate), foreign key(patientid) references patient(patientid));
desc patient_medical_history;


create table doctor_schedule(doctorid int, endtime time, starttime time, availdate date, slotduration int, primary key(doctorid, availdate), foreign key(doctorid) references doctor(doctorid));
desc doctor_schedule;

show tables;



CREATE TABLE Patient_books_Appointment (
    PatientID INT,
    AppointmentID INT,
    Date DATE,
    Time TIME,
    Status VARCHAR(50),
    PRIMARY KEY (PatientID, AppointmentID)
);
desc Patient_books_Appointment;


CREATE TABLE Doctor_assigned_Appointment (
    DoctorID INT,
    AppointmentID INT,
    Date DATE,
    Time TIME,
    Status VARCHAR(50),
    PRIMARY KEY (DoctorID, AppointmentID)
);
desc Doctor_assigned_Appointment;


CREATE TABLE Patient_Order (
    PatientID INT,
    OrderID INT,
    PRIMARY KEY (PatientID, OrderID)
);
desc Patient_Order;


CREATE TABLE Patient_Medicine (
    PatientID INT,
    MedicineID INT,
    PRIMARY KEY (PatientID, MedicineID)
);
desc Patient_Medicine;


CREATE TABLE Order_Payment (
    OrderID INT,
    PaymentID INT,
    PRIMARY KEY (OrderID, PaymentID)
);
desc Order_Payment;


CREATE TABLE Doctor_Clinic (
    DoctorID INT,
    ClinicID INT,
    PRIMARY KEY (DoctorID, ClinicID)
);
desc Doctor_Clinic;

CREATE TABLE Appointment_generates_Medical_Record (
    AppointmentID INT PRIMARY KEY,
    Diagnosis VARCHAR(255),
    VisitDate DATE,
    Treatment VARCHAR(255),
    RecordID INT UNIQUE
);
desc Appointment_generates_Medical_Record;


CREATE TABLE Medical_Record_has_Test_Report (
    RecordID INT,
    TestType VARCHAR(100),
    TestResult VARCHAR(255),
    TestDate DATE,
    PRIMARY KEY (RecordID, TestType)
);
desc Medical_Record_has_Test_Report;
select * from doctor;
select * from patient;
select * from patient_address;
select * from medicine;
select * from order_table;
select * from clinic;
select * from appointment;
select * from payment;
select * from medical_record;
select * from test_report;
select * from prescription;
select * from prescription_medicine;
select * from patient_medical_history;
select * from doctor_schedule;
select * from Patient_books_Appointment;
select * from Doctor_assigned_Appointment;
select * from Patient_Order;
select * from Patient_Medicine;
select * from Order_Payment;
select * from Doctor_Clinic;
select * from Appointment_generates_Medical_Record;
select * from Medical_Record_has_Test_Report;

SELECT first_name, last_name FROM doctor WHERE specialisation = 'Cardiologist';
SELECT first_name, last_name, age FROM patient WHERE age > 20;
SELECT appointmentid, date, time FROM appointment WHERE status = 'Scheduled';
SELECT first_name, last_name FROM patient WHERE first_name LIKE 'A%';
SELECT p.first_name, p.last_name, a.city FROM patient p JOIN patient_address a ON p.patientid = a.patientid WHERE a.city IN ('Mumbai', 'Pune', 'Nagpur');
SELECT first_name, last_name FROM patient WHERE gender = 'Female' AND age < 30;
SELECT pm.prescriptionid, m.medicinename, pm.quantity FROM prescription_medicine pm JOIN medicine m ON pm.medicineid = m.medicineid;
SELECT a.appointmentid, a.date, p.first_name, p.last_name FROM appointment a JOIN patient p ON a.appointmentid = p.patientid;
SELECT tr.testtype, tr.testresult, mr.diagnosis FROM test_report tr JOIN medical_record mr ON tr.recordid = mr.recordid;
SELECT medicinename, price FROM medicine ORDER BY price DESC;
SELECT status, COUNT(*) AS total FROM appointment GROUP BY status;
SELECT paymentmethod, SUM(amount) AS total_paid FROM payment GROUP BY paymentmethod;
SELECT d.first_name, d.last_name, s.availdate, s.starttime, s.endtime FROM doctor d JOIN doctor_schedule s ON d.doctorid = s.doctorid;
SELECT p.first_name, p.last_name, m.medicinename
FROM patient p
JOIN prescription pr ON p.patientid = pr.prescriptionid
JOIN prescription_medicine pm ON pr.prescriptionid = pm.prescriptionid
JOIN medicine m ON pm.medicineid = m.medicineid;
SELECT city FROM clinic UNION SELECT city FROM patient_address;
SELECT specialisation, COUNT(*) AS doctor_count FROM doctor GROUP BY specialisation;
SELECT city, COUNT(*) AS patient_count FROM patient_address GROUP BY city HAVING COUNT(*) >= 1;
SELECT * FROM appointment WHERE date = CURRENT_DATE;
SELECT medicinename, stock FROM medicine WHERE stock < 110;
SELECT * FROM test_report WHERE testresult LIKE '%Positive%';
SELECT medicinename, price FROM medicine ORDER BY price DESC LIMIT 3;
SELECT issuedate, COUNT(*) AS total_prescriptions FROM prescription GROUP BY issuedate;
SELECT * FROM clinic WHERE clinicname LIKE 'S%';
SELECT DISTINCT city FROM clinic;
ALTER TABLE order_table MODIFY orderstatus VARCHAR(100);
ALTER TABLE order_table RENAME COLUMN totalamount TO total_price;
desc order_table;
UPDATE order_table SET orderstatus = 'Delivered' WHERE orderdate < '2025-03-14';
select * from order_table;
UPDATE patient_medical_history SET currentstatus = 'Recovered' WHERE diagnoseddate < '2022-01-01';
select * from patient_medical_history;
SELECT * FROM clinic WHERE city IN ('Mumbai', 'Pune', 'Nashik');
(SELECT city FROM clinic) UNION (SELECT city FROM patient_address);
ALTER TABLE doctor ADD CONSTRAINT unique_contact UNIQUE(contactnumber);
desc doctor;
SELECT * FROM order_table WHERE orderid IN (1, 3, 10, 16);
SELECT pt.patientid, pt.first_name, pt.last_name, pmh.medical_condition, pmh.currentstatus
FROM patient pt
INNER JOIN patient_medical_history pmh ON pt.patientid = pmh.patientid;
SELECT clinicid, clinicname, city FROM clinic WHERE clinicname LIKE '%Care%';
SELECT c.city AS clinic_city, pa.city AS patient_city
FROM patient_address pa
RIGHT JOIN clinic c ON pa.city = c.city;
UPDATE order_table SET orderstatus = 'Shipped' WHERE total_price > 200;
select * from order_table;
SELECT patientid, first_name, last_name FROM patient WHERE last_name LIKE '%son%';
CREATE VIEW patient_with_address AS
SELECT p.patientid, p.first_name, p.last_name, a.city, a.street
FROM patient p
JOIN patient_address a ON p.patientid = a.patientid;
desc patient_with_address;
SELECT * FROM patient_with_address WHERE city = 'Mumbai';
START TRANSACTION;
UPDATE medicine SET stock = stock - 1 WHERE medicineid = 3;
COMMIT;
desc medicine;
SELECT p.* FROM payment p WHERE p.amount = (SELECT MAX(amount) FROM payment);
SELECT * FROM order_table WHERE total_price > (SELECT AVG(total_price) FROM order_table);
SELECT orderid FROM order_table INTERSECT SELECT orderid FROM payment;
SELECT orderid, total_price FROM order_table ORDER BY total_price DESC LIMIT 10;





