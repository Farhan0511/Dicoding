import NowPlaying from '../view/pages/now-playing';
import Upcoming from '../view/pages/upcoming';
import Detail from '../view/pages/detail';

const routes = {
  '/': NowPlaying, // default page
  '/now-playing': NowPlaying,
  '/upcoming': Upcoming,
  '/detail/:id': Detail,
};

export default routes;
