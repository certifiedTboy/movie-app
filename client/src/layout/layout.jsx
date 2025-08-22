import { useLocation, useSearchParams } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";
import AppRoutes from "./app-routes";
import { seo } from "../helpers/seo";

const Layout = () => {
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();

  const movieTitle = searchParams.get("movieTitle");
  const movieDescription = searchParams.get("description");

  let seoData = {};

  if (pathname === "/" || pathname === "/home") {
    seoData = {
      title: "Movie App",
      metaDescription: "A movie app to explore and discover films.",
    };
  } else if (pathname === "/movies") {
    seoData = {
      title: "Movie App - Movies",
      metaDescription: "Explore a wide range of movies in our collection.",
    };
  } else if (pathname === `/movies/${pathname.split("/")[2]}`) {
    seoData = {
      title: movieTitle,
      metaDescription: movieDescription,
    };
  } else {
    seoData = {
      title: "404 - page not found",
      metaDescription: "The page you are looking for does not exist.",
    };
  }

  seo(seoData);

  return (
    <>
      <header className="fixed top-0 left-0 right-0">
        <NavBar />
      </header>
      <main className="mt-[50px] mb-[60px]">
        <AppRoutes />
      </main>
      {pathname !== "/movies" && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  );
};

export default Layout;
