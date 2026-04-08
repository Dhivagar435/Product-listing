/**
 * @swagger
 * /api/v1/getSuperAdmin/:id:
 *   get:
 *     summary: Find Super Admin by name
 *     description: Retrieves the Super Admin's ID, name, and password by their name.
 *     tags: [SuperAdmin]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: "vilora"
 *     responses:
 *       200:
 *         description: Super Admin data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "384isWqs"
 *                   name:
 *                     type: string
 *                     example: "vilora"
 *                   password:
 *                     type: string
 *                     example: "$2b$10$123456hashedPassword"
 *       404:
 *         description: Super Admin not found
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/allocation:
 *   post:
 *     summary: Add a new allocation
 *     description: Allocates a staff member to a standard and section.
 *     tags: [Allocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - standard_id
 *               - section_id
 *               - staff_id
 *               - createdBy
 *             properties:
 *               standard_id:
 *                 type: integer
 *                 example: 3
 *               section_id:
 *                 type: integer
 *                 example: 1
 *               staff_id:
 *                 type: string
 *                 example: "isgmo86m"
 *               createdBy:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Allocation added successfully
 *       400:
 *         description: Bad request or invalid input
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getAllocation:
 *   get:
 *     summary: Get all allocations
 *     description: Retrieves all staff allocations to standards and sections.
 *     tags: [Allocation]
 *     responses:
 *       200:
 *         description: List of allocations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   std:
 *                     type: string
 *                     example: "I"
 *                   section:
 *                     type: string
 *                     example: "A"
 *                   staff:
 *                     type: string
 *                     example: "sabithaK"
 *                   standard_id:
 *                     type: integer
 *                     example: 3
 *                   section_id:
 *                     type: integer
 *                     example: 1
 *                   staff_id:
 *                     type: string
 *                     example: "isgmo86m"
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/editAllocation:
 *   post:
 *     summary: Edit an allocation
 *     description: Updates an existing staff allocation record.
 *     tags: [Allocation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - standard_id
 *               - section_id
 *               - staff_id
 *               - updatedBy
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 5
 *               standard_id:
 *                 type: integer
 *                 example: 2
 *               section_id:
 *                 type: integer
 *                 example: 1
 *               staff_id:
 *                 type: string
 *                 example: "isgmo86m"
 *               updatedBy:
 *                 type: string
 *                 example: "admin456"
 *     responses:
 *       200:
 *         description: Allocation updated successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/calender:
 *   post:
 *     summary: Add a calendar event
 *     description: Adds a new event with its date to the calendar.
 *     tags: [Calendar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - event
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-15"
 *               event:
 *                 type: string
 *                 example: "Independence Day Celebration"
 *     responses:
 *       200:
 *         description: Event added successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server/database error
 */
/**
 * @swagger
 * /api/v1/getCalender:
 *   get:
 *     summary: Get all calendar events
 *     description: Retrieves all events listed in the calendar.
 *     tags: [Calendar]
 *     responses:
 *       200:
 *         description: List of calendar events retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Data Recieved
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       event:
 *                         type: string
 *                         example: "Annual Day"
 *                       event_date:
 *                         type: string
 *                         format: date
 *                         example: "2025-09-10"
 *       500:
 *         description: Server/database error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Error Retrieving Data
 *                 error:
 *                   type: string
 *                   example: "MySQL error message"
 */

/**
 * @swagger
 * /api/v1/Time:
 *   post:
 *     summary: Add a new Time
 *     description: Adds a new Time to the Time table.
 *     tags: [Time]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Time_number
 *               - createdBy
 *             properties:
 *               Time_number:
 *                 type: integer
 *                 example: 1
 *               createdBy:
 *                 type: string
 *                 example: "admin001"
 *     responses:
 *       200:
 *         description: Time added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getTime:
 *   get:
 *     summary: Get all Times
 *     description: Retrieves all Times from the Time table.
 *     tags: [Time]
 *     responses:
 *       200:
 *         description: List of Times retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   Time_number:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/editTime:
 *   post:
 *     summary: Edit a Time
 *     description: Updates the Time number based on the given ID.
 *     tags: [Time]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Time_number
 *               - id
 *               - updatedBy
 *             properties:
 *               Time_number:
 *                 type: integer
 *                 example: 2
 *               id:
 *                 type: integer
 *                 example: 1
 *               updatedBy:
 *                 type: string
 *                 example: "superadmin001"
 *     responses:
 *       200:
 *         description: Time updated successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/role:
 *   post:
 *     summary: Add a new  role
 *     description: Adds a new role to the  role table.
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Assistant Teacher"
 *               createdBy:
 *                 type: string
 *                 example: "superadmin001"
 *     responses:
 *       200:
 *         description: Staff role added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getRole:
 *   get:
 *     summary: Get all roles
 *     description: Retrieves all roles from the role table.
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of  roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Principal"
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/editRole:
 *   post:
 *     summary: Edit a  role
 *     description: Updates the name of an existing  role by its ID.
 *     tags: [ Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - id
 *               - updatedBy
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Head Teacher"
 *               id:
 *                 type: integer
 *                 example: 2
 *               updatedBy:
 *                 type: string
 *                 example: "superadmin002"
 *     responses:
 *       200:
 *         description: Staff role updated successfully
 *       400:
 *         description: Invalid data or missing fields
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/section:
 *   post:
 *     summary: Add a new section
 *     description: Adds a new section (e.g., A, B) to the section table.
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *                 example: "A"
 *               createdBy:
 *                 type: string
 *                 example: "superadmin001"
 *     responses:
 *       200:
 *         description: Section added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: success
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getSection:
 *   get:
 *     summary: Get all sections
 *     description: Retrieves all sections from the section table.
 *     tags: [Section]
 *     responses:
 *       200:
 *         description: Sections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "B"
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/editSection:
 *   post:
 *     summary: Edit a section
 *     description: Updates the name of an existing section using its ID.
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Section
 *               - id
 *               - updatedBy
 *             properties:
 *               Section:
 *                 type: string
 *                 example: "C"
 *               id:
 *                 type: integer
 *                 example: 2
 *               updatedBy:
 *                 type: string
 *                 example: "admin002"
 *     responses:
 *       200:
 *         description: Section updated successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/circular:
 *   post:
 *     summary: Add a circular
 *     description: Adds a new circular to the staff_circular_tbl with content, title, and creator info.
 *     tags: [Circular]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - title
 *               - createdBy
 *             properties:
 *               content:
 *                 type: string
 *                 example: "School will be closed on Friday due to maintenance."
 *               title:
 *                 type: string
 *                 example: "Holiday Notification"
 *               createdBy:
 *                 type: string
 *                 example: "admin001"
 *     responses:
 *       200:
 *         description: Circular added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: success
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getallCircular:
 *   get:
 *     summary: Get all staff circulars
 *     description: Retrieves all circulars from the staff_circular_tbl including content, title, and circular date.
 *     tags: [Circular]
 *     responses:
 *       200:
 *         description: List of staff circulars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                     example: "Annual Day celebration will be held next week."
 *                   title:
 *                     type: string
 *                     example: "Annual Day"
 *                   circular_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-07-01"
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/addStaff:
 *   post:
 *     summary: Add a new staff member
 *     description: Adds a new staff member with personal, contact, and role details.
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - Role
 *               - StaffCode
 *               - Email
 *               - UserName
 *               - Dob
 *               - PhoneNumber
 *               - Qualification
 *               - PhotoProofs
 *               - HouseNo
 *               - Area
 *               - State
 *               - City
 *               - PinCode
 *               - id
 *             properties:
 *               Role:
 *                 type: string
 *                 example: "Teacher"
 *               StaffCode:
 *                 type: string
 *                 example: "STF001"
 *               Email:
 *                 type: string
 *                 format: email
 *                 example: "teacher1@example.com"
 *               UserName:
 *                 type: string
 *                 example: "Ravi Kumar"
 *               Dob:
 *                 type: string
 *                 format: date
 *                 example: "1990-02-15"
 *               PhoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               Qualification:
 *                 type: string
 *                 example: "M.Sc, B.Ed"
 *               PhotoProofs:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile photo
 *               HouseNo:
 *                 type: string
 *                 example: "25B"
 *               Area:
 *                 type: string
 *                 example: "Velachery"
 *               State:
 *                 type: string
 *                 example: "Tamil Nadu"
 *               City:
 *                 type: string
 *                 example: "Chennai"
 *               PinCode:
 *                 type: string
 *                 example: "600042"
 *               id:
 *                 type: string
 *                 example: "admin001"
 *     responses:
 *       200:
 *         description: Staff added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Randompassword:
 *                   type: string
 *                   description: Generated password for the new staff
 *                   example: "xYz12Ab3"
 *                 getdata:
 *                   type: object
 *                   description: Data returned from the model layer
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/getStaff:
 *   get:
 *     summary: Get all staff members
 *     description: Retrieves a list of all staff with full details including role, contact, and address.
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "78js73hs"
 *                   Role:
 *                     type: string
 *                     example: "Teacher"
 *                   staffCode:
 *                     type: string
 *                     example: "STF001"
 *                   email:
 *                     type: string
 *                     example: "teacher1@example.com"
 *                   password:
 *                     type: string
 *                     example: "hashed_password"
 *                   name:
 *                     type: string
 *                     example: "Ravi Kumar"
 *                   dob:
 *                     type: string
 *                     example: "1990-02-15"
 *                   phoneNumber:
 *                     type: string
 *                     example: "9876543210"
 *                   qualification:
 *                     type: string
 *                     example: "M.Sc, B.Ed"
 *                   photoName:
 *                     type: string
 *                     example: "ravi.jpg"
 *                   photoPath:
 *                     type: string
 *                     example: "uploads/staff/ravi.jpg"
 *                   HouseNo_Street:
 *                     type: string
 *                     example: "25B"
 *                   Area:
 *                     type: string
 *                     example: "Velachery"
 *                   State:
 *                     type: string
 *                     example: "Tamil Nadu"
 *                   City:
 *                     type: string
 *                     example: "Chennai"
 *                   Pincode:
 *                     type: string
 *                     example: "600042"
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/editStaff:
 *   post:
 *     summary: Edit staff member details
 *     description: Updates personal and contact info of a staff member.
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - staffCode
 *               - email
 *               - name
 *               - dob
 *               - phoneNumber
 *               - qualification
 *               - HouseNo_Street
 *               - Area
 *               - State
 *               - City
 *               - Pincode
 *               - updatedBy
 *             properties:
 *               id:
 *                 type: string
 *                 example: "78js73hs"
 *               staffCode:
 *                 type: string
 *                 example: "STF002"
 *               email:
 *                 type: string
 *                 example: "newstaff@example.com"
 *               name:
 *                 type: string
 *                 example: "Ravi New"
 *               dob:
 *                 type: string
 *                 example: "1991-03-10"
 *               phoneNumber:
 *                 type: string
 *                 example: "9876540000"
 *               qualification:
 *                 type: string
 *                 example: "Ph.D"
 *               HouseNo_Street:
 *                 type: string
 *                 example: "22B"
 *               Area:
 *                 type: string
 *                 example: "T Nagar"
 *               State:
 *                 type: string
 *                 example: "Tamil Nadu"
 *               City:
 *                 type: string
 *                 example: "Chennai"
 *               Pincode:
 *                 type: string
 *                 example: "600017"
 *               updatedBy:
 *                 type: string
 *                 example: "admin002"
 *     responses:
 *       200:
 *         description: Staff info updated
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/userNameStaff/:id:
 *   get:
 *     summary: Get staff name, email, and photo
 *     description: Fetches the basic profile information of a staff member by ID.
 *     tags: [Staff]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "78js73hs"
 *     responses:
 *       200:
 *         description: Staff info retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Ravi Kumar"
 *                 email:
 *                   type: string
 *                   example: "ravi@example.com"
 *                 photoName:
 *                   type: string
 *                   example: "ravi.jpg"
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/staffCount:
 *   get:
 *     summary: Get total number of staff members
 *     description: Returns the total number of registered staff in the system.
 *     tags: [Staff]
 *     responses:
 *       200:
 *         description: Count of staff returned
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 42
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/standard:
 *   post:
 *     summary: Add a new standard/class
 *     description: Adds a new standard (like Class 1, Class 10) into the system.
 *     tags: [Standard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - createdBy
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Class 6"
 *               createdBy:
 *                 type: string
 *                 example: "admin001"
 *     responses:
 *       200:
 *         description: Standard added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server/database error
 */

/**
 * @swagger
 * /api/v1/getStandard:
 *   get:
 *     summary: Get all standards
 *     description: Retrieves a list of all standards (classes) stored in the database.
 *     tags: [Standard]
 *     responses:
 *       200:
 *         description: Successfully retrieved standard list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Class 6"
 *       500:
 *         description: Internal server/database error
 */

/**
 * @swagger
 * /api/v1/editStandard:
 *   post:
 *     summary: Edit an existing standard
 *     description: Updates the name of a specific standard by its ID.
 *     tags: [Standard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - Standard
 *               - updatedBy
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 3
 *               Standard:
 *                 type: string
 *                 example: "Class 7"
 *               updatedBy:
 *                 type: string
 *                 example: "admin002"
 *     responses:
 *       200:
 *         description: Standard updated successfully
 *       400:
 *         description: Bad request (invalid ID or data)
 *       500:
 *         description: Internal server/database error
 */

/**
 * @swagger
 * /api/v1/circular:
 *   post:
 *     summary: Add a new student circular
 *     description: Inserts a new circular intended for students with title, content, and createdBy user.
 *     tags: [StudentCircular]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - title
 *               - createdBy
 *             properties:
 *               content:
 *                 type: string
 *                 example: "School will remain closed on Friday due to weather conditions."
 *               title:
 *                 type: string
 *                 example: "Holiday Notice"
 *               createdBy:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Student circular added successfully
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getCircular:
 *   get:
 *     summary: Get all circulars (student and staff)
 *     description: Retrieves both student and staff circulars in a combined response.
 *     tags: [StudentCircular]
 *     responses:
 *       200:
 *         description: Successfully retrieved all circulars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "Holiday Notice"
 *                   content:
 *                     type: string
 *                     example: "School will remain closed on Friday due to weather."
 *                   circular_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-20"
 *                   staffTitle:
 *                     type: string
 *                     example: "Meeting Alert"
 *                   staffcontent:
 *                     type: string
 *                     example: "All staff are requested to attend the meeting at 2 PM."
 *                   staffcirculardate:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-21"
 *       500:
 *         description: Internal server/database error
 */
/**
 * @swagger
 * /api/v1/addStudent:
 *   post:
 *     summary: Add a new student
 *     description: Adds a new student to the database with complete academic, parental, and contact details.
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - studentCode
 *               - email
 *               - password
 *               - name
 *               - dob
 *               - phoneNumber
 *               - standard_id
 *               - section_id
 *               - TypeofParental
 *               - FatherName
 *               - FatherOccupation
 *               - MotherName
 *               - MotherOccupation
 *               - GuardianName
 *               - GuardianOccupation
 *               - PhotoProof
 *               - addmissionNumber
 *               - HouseNo_Street
 *               - Area
 *               - State
 *               - City
 *               - Pincode
 *               - createdBy
 *             properties:
 *               id:
 *                 type: string
 *               studentCode:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               phoneNumber:
 *                 type: string
 *               standard_id:
 *                 type: string
 *               section_id:
 *                 type: string
 *               TypeofParental:
 *                 type: string
 *               FatherName:
 *                 type: string
 *               FatherOccupation:
 *                 type: string
 *               MotherName:
 *                 type: string
 *               MotherOccupation:
 *                 type: string
 *               GuardianName:
 *                 type: string
 *               GuardianOccupation:
 *                 type: string
 *               PhotoProof:
 *                 type: string
 *                 format: binary
 *               addmissionNumber:
 *                 type: string
 *               HouseNo_Street:
 *                 type: string
 *               Area:
 *                 type: string
 *               State:
 *                 type: string
 *               City:
 *                 type: string
 *               Pincode:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student added successfully
 *       400:
 *         description: Bad request – Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getStudent:
 *   get:
 *     summary: Get all students
 *     description: Retrieves a list of all students with academic, contact, and parental information.
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: List of students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   studentCode:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   dob:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   section:
 *                     type: string
 *                     example: "A"
 *                   typeofParental:
 *                     type: string
 *                   parentalName:
 *                     type: string
 *                   parentalOccupation:
 *                     type: string
 *                   photoName:
 *                     type: string
 *                   photoPath:
 *                     type: string
 *                   addmissionNumber:
 *                     type: string
 *                   HouseNo_Street:
 *                     type: string
 *                   Area:
 *                     type: string
 *                   State:
 *                     type: string
 *                   City:
 *                     type: string
 *                   Pincode:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/editStudent:
 *   post:
 *     summary: Edit student details
 *     description: Updates the given student's personal and academic information.
 *     tags: [Student]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "std123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentCode
 *               - email
 *               - name
 *               - dob
 *               - phoneNumber
 *               - parentalName
 *               - parentalOccupation
 *               - addmissionNumber
 *               - HouseNo_Street
 *               - Area
 *               - State
 *               - City
 *               - Pincode
 *               - updatedBy
 *             properties:
 *               studentCode:
 *                 type: string
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               dob:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               parentalName:
 *                 type: string
 *               parentalOccupation:
 *                 type: string
 *               addmissionNumber:
 *                 type: string
 *               HouseNo_Street:
 *                 type: string
 *               Area:
 *                 type: string
 *               State:
 *                 type: string
 *               City:
 *                 type: string
 *               Pincode:
 *                 type: string
 *               updatedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/userNameStudent/:id:
 *   get:
 *     summary: Get student's name, email, and photo
 *     description: Fetch basic profile info of a student by ID.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "std001"
 *     responses:
 *       200:
 *         description: Student info retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Jane Doe"
 *                   email:
 *                     type: string
 *                     example: "jane@student.com"
 *                   photoName:
 *                     type: string
 *                     example: "student1.jpg"
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/studentCount:
 *   get:
 *     summary: Get total student count
 *     description: Returns the total number of registered students.
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Count of students returned
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 412
 *       500:
 *         description: Server/database error
 */

/**
 * @swagger
 * /api/v1/subject:
 *   post:
 *     summary: Add a new subject
 *     description: Adds a new subject to the system.
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject_name
 *               - createdBy
 *             properties:
 *               subject_name:
 *                 type: string
 *                 example: Mathematics
 *               createdBy:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Subject added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getSubject:
 *   get:
 *     summary: Get all subjects
 *     description: Retrieves a list of all subjects.
 *     tags: [Subject]
 *     responses:
 *       200:
 *         description: List of subjects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   subject_name:
 *                     type: string
 *                     example: Science
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/editSubject:
 *   put:
 *     summary: Edit subject
 *     description: Updates the subject name using its ID.
 *     tags: [Subject]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject_name
 *               - updatedBy
 *             properties:
 *               subject_name:
 *                 type: string
 *                 example: Physics
 *               updatedBy:
 *                 type: string
 *                 example: admin456
 *     responses:
 *       200:
 *         description: Subject updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subject not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/superAdmin:
 *   post:
 *     summary: Create a Super Admin
 *     description: Creates a new Super Admin. The system generates the ID and password, and sends the password to the given email.
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Vilora"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "abcd@example.com"
 *     responses:
 *       201:
 *         description: Super Admin created and password emailed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "Super Admin registered and email sent."
 *                 data:
 *                   type: object
 *                   properties:
 *                     Randompassword:
 *                       type: string
 *                       example: "Xyz123ab"
 *                     getdata:
 *                       type: string
 *                       example: "success"
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Failed to register Super Admin
 */

/**
 * @swagger
 * /api/v1/getSuperAdmin/:id:
 *   get:
 *     summary: Get Super Admin info
 *     description: Retrieves a Super Admin's name and email by their ID.
 *     tags: [SuperAdmin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "admin123"
 *     responses:
 *       200:
 *         description: Super Admin info retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "vilora"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "abcd@example.com"
 *       404:
 *         description: Super Admin not found
 *       500:
 *         description: Internal server error
 */
