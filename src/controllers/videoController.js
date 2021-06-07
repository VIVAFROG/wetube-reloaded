import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render('home', { pageTitle: 'Home', videos: [] });
};
export const watch = (req, res) => {
  res.render('watch', { pageTitle: 'Watchching ' });
};
export const getEdit = (req, res) => {
  res.render('edit', { pageTitle: 'Editing: ' });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload Video' });
};
export const postUpload = (req, res) => {
  res.redirect('/');
};
