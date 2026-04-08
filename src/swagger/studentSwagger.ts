/**
 * @swagger
 * /api/v1/getStudentActivities/:id:
 *   get:
 *     summary: Get activities for a student
 *     description: Retrieves activities related to a student's class and section based on the student ID.
 *     tags: [Student Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *           example: "stu001"
 *     responses:
 *       200:
 *         description: List of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "act123"
 *                   content:
 *                     type: string
 *                     example: "Annual Day Rehearsal"
 *                   title:
 *                     type: string
 *                     example: "Annual Day"
 *                   activities_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-25"
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   section:
 *                     type: string
 *                     example: "A"
 *       404:
 *         description: No activities found for the student
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getAttendance/:id:
 *   get:
 *     summary: Get attendance for a student
 *     description: Retrieves the attendance records (forenoon and afternoon) for a student based on their ID.
 *     tags: [Student Attendance]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *           example: "stu001"
 *     responses:
 *       200:
 *         description: List of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "attend001"
 *                   DateOfAtt:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-25"
 *                   FORENOON:
 *                     type: string
 *                     example: "Present"
 *                   AFTERNOON:
 *                     type: string
 *                     example: "Absent"
 *                   student:
 *                     type: string
 *                     example: "John Doe"
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   section:
 *                     type: string
 *                     example: "A"
 *       404:
 *         description: No attendance records found for the student
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getStudentHomework/:id:
 *   get:
 *     summary: Get homework for a student
 *     description: Retrieves the list of homework assigned to a student based on their ID, including title, content, assigned date, due date, and related class and section.
 *     tags: [Student Homework]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student ID
 *         schema:
 *           type: string
 *           example: "stu001"
 *     responses:
 *       200:
 *         description: List of homework entries for the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "hw001"
 *                   content:
 *                     type: string
 *                     example: "Complete the algebra worksheet."
 *                   title:
 *                     type: string
 *                     example: "Algebra Homework"
 *                   homework_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-24"
 *                   due_date:
 *                     type: string
 *                     format: date
 *                     example: "2025-06-28"
 *                   std:
 *                     type: string
 *                     example: "10th Grade"
 *                   section:
 *                     type: string
 *                     example: "A"
 *       404:
 *         description: No homework records found for the student
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Find admin,staff,student by email
 *     description: Retrieves admin,staff,student ID, email, and password based on the provided email address for login purposes.
 *     tags: [Auth]
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
 *                 example: student1@example.com
 *     responses:
 *       200:
 *         description: Student found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "stu001"
 *                 email:
 *                   type: string
 *                   example: "student1@example.com"
 *                 password:
 *                   type: string
 *                   example: "$2b$10$encryptedPasswordHash"
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
