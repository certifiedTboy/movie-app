import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/movies/${props.movieId}`}>
        <img
          className="rounded-t-lg h-[250px] w-full"
          src={props.imageUrl}
          alt=""
        />
      </Link>
      <div className="p-5">
        <Link to={`/movies/${props.movieId}`}>
          <h5 className="mb-2 text-[15px] font-bold truncate tracking-tight text-gray-900 dark:text-white">
            {props.title}
          </h5>
        </Link>
        <p className="mb-3 truncate font-normal text-gray-700 dark:text-gray-400">
          {props.description}
        </p>
        <Link
          to={`/movies/${props.movieId}?movieTitle=${props.title}&description=${props.description}`}
          className="inline-flex items-center  text-sm font-medium text-center text-white "
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
