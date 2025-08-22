import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetWatchlistByUserMutation } from "../../lib/watchlistApis";

const UserDashboard = () => {
  const [getWatchlistByUser, { data }] = useGetWatchlistByUserMutation();
  const { currentUser } = useSelector((state) => state.userState);

  useEffect(() => {
    getWatchlistByUser();
  }, []);

  return (
    <section className="mt-[100px]">
      <h1>Welcome {currentUser?.firstName}</h1>

      {data?.data?.length > 0 ? (
        <ul>
          {data.data.map((movie) => (
            <li key={movie._id}>{movie.movieTitle}</li>
          ))}
        </ul>
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </section>
  );
};

export default UserDashboard;
