export async function syncPost(req, res) {

  const post = req.body;

  try {

    await db.collection("posts").add({
      title: post.title,
      content: post.content,
      tafakari: post.tafakari,
      sala: post.sala,
      status: post.status || "draft",
      createdAt: new Date()
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}