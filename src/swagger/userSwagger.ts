/**
 * @swagger
 * /api/v1/gallery:
 *   post:
 *     summary: Upload multiple gallery images
 *     description: Uploads multiple image files to the gallery. Each image will be stored with its filename and path.
 *     tags: [Gallery]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagess:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload up to 10 image files
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "success"
 *       400:
 *         description: Bad request or missing files
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getGallery:
 *   get:
 *     summary: Get all gallery images
 *     description: Returns all image records stored in the gallery with name and path.
 *     tags: [Gallery]
 *     responses:
 *       200:
 *         description: List of gallery images retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   proof_name:
 *                     type: string
 *                     example: "image1.jpg"
 *                   proofImagePath:
 *                     type: string
 *                     example: "uploads/gallery/image1.jpg"
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/header:
 *   post:
 *     summary: Add a new school heading
 *     description: Upload a school heading with photo, name, and address.
 *     tags: [School Heading]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo_name
 *               - photo_path
 *               - school_name
 *               - school_address
 *             properties:
 *               photo_name:
 *                 type: string
 *                 example: "school_banner.jpg"
 *               photo_path:
 *                 type: string
 *                 format: binary
 *                 description: Upload an image file
 *               school_name:
 *                 type: string
 *                 example: "Greenwood High School"
 *               school_address:
 *                 type: string
 *                 example: "123 Main Street, Springfield"
 *     responses:
 *       200:
 *         description: School heading added successfully
 *       400:
 *         description: Bad request or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getHeader:
 *   get:
 *     summary: Retrieve all school heading records
 *     description: Returns a list of all school headings including photo, name, and address.
 *     tags: [School Heading]
 *     responses:
 *       200:
 *         description: List of school headings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   photo_name:
 *                     type: string
 *                   photo_path:
 *                     type: string
 *                   school_name:
 *                     type: string
 *                   school_address:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/editHeader:
 *   put:
 *     summary: Update an existing school heading
 *     description: Edit the school heading details including photo, name, and address.
 *     tags: [School Heading]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - photo_name
 *               - photo_path
 *               - school_name
 *               - school_address
 *               - updated_by
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               photo_name:
 *                 type: string
 *                 example: "updated_banner.jpg"
 *               photo_path:
 *                 type: string
 *                 format: binary
 *                 description: Upload updated image
 *               school_name:
 *                 type: string
 *                 example: "Greenwood International School"
 *               school_address:
 *                 type: string
 *                 example: "456 Park Avenue, Springfield"
 *               updated_by:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: School heading updated successfully
 *       400:
 *         description: Invalid input or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/members:
 *   post:
 *     summary: Add a new management member
 *     description: Adds a new management team member with profile image and details.
 *     tags: [Management Members]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - image
 *               - qualification
 *               - experience
 *               - email
 *               - phone
 *               - description
 *               - linkedin
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Dr. A. P. Sharma"
 *               position:
 *                 type: string
 *                 example: "Principal"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Upload member profile image
 *               qualification:
 *                 type: string
 *                 example: "Ph.D. in Education"
 *               experience:
 *                 type: string
 *                 example: "20 years"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "principal@example.com"
 *               phone:
 *                 type: string
 *                 example: "+91-9876543210"
 *               description:
 *                 type: string
 *                 example: "Dedicated to academic excellence and leadership."
 *               linkedin:
 *                 type: string
 *                 example: "https://linkedin.com/in/principal"
 *     responses:
 *       200:
 *         description: Member added successfully
 *       400:
 *         description: Bad request or validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getMembers:
 *   get:
 *     summary: Get all management members
 *     description: Retrieves a list of all management members along with their details and profile images.
 *     tags: [Management Members]
 *     responses:
 *       200:
 *         description: List of members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *                   qualification:
 *                     type: string
 *                   experience:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   description:
 *                     type: string
 *                   image_name:
 *                     type: string
 *                   image_path:
 *                     type: string
 *                   linkedin:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/userActivity:
 *   post:
 *     summary: Add a new user activity
 *     description: Adds a new user highlight/activity with an optional image, title, and content.
 *     tags: [User Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - create_by
 *               - img
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: Upload an image file
 *               title:
 *                 type: string
 *                 example: "Clean Campus Drive"
 *               content:
 *                 type: string
 *                 example: "Students participated in a campus-wide cleanliness drive."
 *               create_by:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Activity added successfully
 *       400:
 *         description: Missing required fields or bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getUserActivity:
 *   get:
 *     summary: Get all user activities
 *     description: Retrieves a list of all user highlights/activities.
 *     tags: [User Activity]
 *     responses:
 *       200:
 *         description: List of user activities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   img:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/editUserActivity/{id}:
 *   post:
 *     summary: Edit a user activity
 *     description: Updates a user highlight/activity by ID. Image update is optional.
 *     tags: [User Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - update_by
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *                 description: Upload new image (optional)
 *               title:
 *                 type: string
 *                 example: "Updated Campus Drive"
 *               content:
 *                 type: string
 *                 example: "Updated description for the activity"
 *               update_by:
 *                 type: string
 *                 example: "admin456"
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       400:
 *         description: Invalid input or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/hero:
 *   post:
 *     summary: Add a new hero section
 *     description: Upload hero background and icon images along with title, subtitle, and created_by/updated_by metadata.
 *     tags: [Hero Section]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - heroBackground
 *               - heroIcon
 *               - heroTitle
 *               - heroSubTitle
 *               - created_by
 *               - updated_by
 *             properties:
 *               heroBackground:
 *                 type: string
 *                 format: binary
 *                 description: Background image of the hero section
 *               heroIcon:
 *                 type: string
 *                 format: binary
 *                 description: Icon image for the hero section
 *               heroTitle:
 *                 type: string
 *                 example: "Welcome to Our School"
 *               heroSubTitle:
 *                 type: string
 *                 example: "Where education meets excellence"
 *               created_by:
 *                 type: string
 *                 example: "admin123"
 *               updated_by:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       200:
 *         description: Hero section added successfully
 *       400:
 *         description: Bad request or missing fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/hero:
 *   get:
 *     summary: Get all hero section entries
 *     description: Retrieves all hero sections with their background, icon, title, and subtitle.
 *     tags: [Hero Section]
 *     responses:
 *       200:
 *         description: List of hero sections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   heroBackground:
 *                     type: string
 *                   heroIcon:
 *                     type: string
 *                   heroTitle:
 *                     type: string
 *                   heroSubTitle:
 *                     type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/hero/update/{id}:
 *   post:
 *     summary: Update a hero section by ID
 *     description: Updates a hero section. You may optionally update one or both images (background or icon), along with title and subtitle.
 *     tags: [Hero Section]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the hero section to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               heroBackground:
 *                 type: string
 *                 format: binary
 *                 description: Optional new background image
 *               heroIcon:
 *                 type: string
 *                 format: binary
 *                 description: Optional new icon image
 *               heroTitle:
 *                 type: string
 *                 example: "Updated Title"
 *               heroSubTitle:
 *                 type: string
 *                 example: "Updated Subtitle"
 *               updated_by:
 *                 type: string
 *                 example: "editor456"
 *     responses:
 *       200:
 *         description: Hero section updated successfully
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/userTopper:
 *   post:
 *     summary: Add a new topper
 *     description: Upload a topper image and details including name, marks, standard, and rank.
 *     tags: [Topper]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - topperImg
 *               - topperName
 *               - topperMark
 *               - standard
 *               - Topper_rank
 *             properties:
 *               topperImg:
 *                 type: string
 *                 format: binary
 *                 description: Upload topper image
 *               topperName:
 *                 type: string
 *                 example: "Priya R"
 *               topperMark:
 *                 type: string
 *                 example: "495/500"
 *               standard:
 *                 type: string
 *                 example: "10th Grade"
 *               Topper_rank:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Topper added successfully
 *       400:
 *         description: Missing or invalid input
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/getUserTopper:
 *   get:
 *     summary: Retrieve all toppers
 *     description: Get a list of all toppers including name, marks, image, standard, and rank.
 *     tags: [Topper]
 *     responses:
 *       200:
 *         description: List of toppers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   topperName:
 *                     type: string
 *                   topperMark:
 *                     type: string
 *                   topperImg:
 *                     type: string
 *                   standard:
 *                     type: string
 *                   Topper_rank:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/editUserTopper/{id}:
 *   post:
 *     summary: Edit topper details by ID
 *     description: Update topper information. Image update is optional.
 *     tags: [Topper]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the topper to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - topperName
 *               - topperMark
 *               - standard
 *               - Topper_rank
 *             properties:
 *               topperImg:
 *                 type: string
 *                 format: binary
 *                 description: Upload new topper image (optional)
 *               topperName:
 *                 type: string
 *                 example: "Priya R"
 *               topperMark:
 *                 type: string
 *                 example: "495/500"
 *               standard:
 *                 type: string
 *                 example: "10th Grade"
 *               Topper_rank:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Topper updated successfully
 *       400:
 *         description: Invalid input or missing fields
 *       500:
 *         description: Internal server error
 */
