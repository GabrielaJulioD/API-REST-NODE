const express = require("express");
const router = express.Router();

// Mock de datos para simular una base de datos
let posts = [
  { id: 1, title: "Post 1", body: "Contenido del post 1" },
  { id: 2, title: "Post 2", body: "Contenido del post 2" },
];

// Ruta para obtener todos los posts
router.get("/", (req, res) => {
  res.json(posts);
});

// Ruta para agregar un nuevo post
router.post("/", (req, res) => {
  try {
    const newPost = req.body; // Asumiendo que estás enviando un objeto JSON en el cuerpo de la solicitud
    newPost.id = posts.length + 1;
    posts.push(newPost);
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Hubo un problema al agregar el nuevo post" });
  }
});

// Ruta para actualizar un post existente
router.put("/:postId", (req, res) => {
  try {
    const postId = parseInt(req.params.postId);
    
    if (isNaN(postId)) {
      res.status(400).json({ error: "El ID del post no es válido" });
      return;
    }

    const updatedPost = req.body; // Asumiendo que estás enviando un objeto JSON en el cuerpo de la solicitud

    const index = posts.findIndex((post) => post.id === postId);

    if (index === -1) {
      res.status(404).json({ error: "Post no encontrado" });
      return;
    }

    posts[index] = { ...posts[index], ...updatedPost };

    res.json(posts[index]);
  } catch (error) {
    res.status(500).json({ error: "Hubo un problema al actualizar el post" });
  }
});

module.exports = router;
