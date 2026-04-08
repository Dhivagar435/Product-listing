/**
 * @swagger
 * /api/v1/activities:
 *   post:
 *     summary: Add a new activity
 *     description: Adds a new activity with title, content, image, and associated class/section.
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - standard_id
 *               - section_id
 *               - createdBy
 *               - title
 *               - photoPath
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Annual Sports Day"
 *               standard_id:
 *                 type: integer
 *                 example: 1
 *               section_id:
 *                 type: integer
 *                 example: 2
 *               createdBy:
 *                 type: string
 *                 example: "superadmin123"
 *               title:
 *                 type: string
 *                 example: "Sports Day"
 *               photoPath:
 *                 type: string
 *                 format: binary
 *                 description: Upload an image file
 *     responses:
 *       200:
 *         description: Activity created successfully
 *       400:
 *         description: Bad request or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getActivities:
 *   get:
 *     summary: Get all activities
 *     description: Fetches all activities along with their class and section information.
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: Successfully retrieved activities
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
 *                   title:
 *                     type: string
 *                     example: "Sports Day"
 *                   content:
 *                     type: string
 *                     example: "Annual Sports Day was conducted in the school ground."
 *                   activities_date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-26T10:00:00Z"
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   section:
 *                     type: string
 *                     example: "A"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/attendance:
 *   post:
 *     summary: Add student attendance
 *     description: Adds multiple student attendance records (forenoon and afternoon) for a specific standard and section.
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - id
 *                 - morning
 *                 - afternoon
 *                 - stdid
 *                 - sectionid
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "student123"
 *                 morning:
 *                   type: string
 *                   enum: [Present, Absent]
 *                   example: "Present"
 *                 afternoon:
 *                   type: string
 *                   enum: [Present, Absent]
 *                   example: "Absent"
 *                 stdid:
 *                   type: integer
 *                   example: 1
 *                 sectionid:
 *                   type: integer
 *                   example: 2
 *     responses:
 *       200:
 *         description: Attendance recorded successfully
 *       400:
 *         description: Bad request or invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getbyIdStudent/:id:
 *   get:
 *     summary: Get allocated students for a staff member
 *     description: Retrieves a list of students assigned to a specific staff based on standard and section allocation.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: staff_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the staff member
 *         example: "staff123"
 *     responses:
 *       200:
 *         description: List of allocated students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "student001"
 *                   name:
 *                     type: string
 *                     example: "Ravi Kumar"
 *                   dob:
 *                     type: string
 *                     format: date
 *                     example: "2010-05-15"
 *                   parentalName:
 *                     type: string
 *                     example: "Mr. Kumar"
 *                   phoneNumber:
 *                     type: string
 *                     example: "9876543210"
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   stdid:
 *                     type: integer
 *                     example: 3
 *                   section:
 *                     type: string
 *                     example: "A"
 *                   sectionid:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Invalid staff ID
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/homework:
 *   post:
 *     summary: Add new homework
 *     description: Adds a new homework entry with details like title, content, image, and due date.
 *     tags: [Homework]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - content
 *               - title
 *               - standard_id
 *               - section_id
 *               - PhotoName
 *               - PhotoPath
 *               - createdBy
 *               - due_date
 *             properties:
 *               id:
 *                 type: string
 *                 example: "hw123"
 *               content:
 *                 type: string
 *                 example: "Solve problems 1 to 10 from chapter 3."
 *               title:
 *                 type: string
 *                 example: "Math Homework"
 *               standard_id:
 *                 type: integer
 *                 example: 3
 *               section_id:
 *                 type: integer
 *                 example: 1
 *               PhotoName:
 *                 type: string
 *                 example: "worksheet.jpg"
 *               PhotoPath:
 *                 type: string
 *                 format: binary
 *               createdBy:
 *                 type: string
 *                 example: "staff123"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *     responses:
 *       200:
 *         description: Homework added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getHomework:
 *   get:
 *     summary: Get all homework
 *     description: Retrieves all homework entries with standard, section, and due date.
 *     tags: [Homework]
 *     responses:
 *       200:
 *         description: Successfully retrieved homework entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "hw123"
 *                   content:
 *                     type: string
 *                     example: "Complete exercise 5.2 from the textbook."
 *                   homework_date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-25T10:30:00Z"
 *                   title:
 *                     type: string
 *                     example: "Science Assignment"
 *                   std:
 *                     type: string
 *                     example: "8th Grade"
 *                   section:
 *                     type: string
 *                     example: "B"
 *                   due_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-30"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Staff Login - Find staff by email
 *     description: Retrieves staff details (id, email, password, photoName) by their email for authentication.
 *     tags: [Staff]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "staff@example.com"
 *     responses:
 *       200:
 *         description: Staff found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "stf123"
 *                 email:
 *                   type: string
 *                   example: "staff@example.com"
 *                 password:
 *                   type: string
 *                   example: "$2a$10$E...hash"
 *                 photoName:
 *                   type: string
 *                   example: "profile.png"
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Internal server error
 */
