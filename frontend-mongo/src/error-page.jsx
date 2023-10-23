import { userRouteError } from "react-router-dom";

const ErrorPage = () => {
    const err = userRouteError();
    console.error(err);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>its error</p>
            <div>
                <i>{err.statusText || err.message }</i>
            </div>
        </div>
    )
};

export default ErrorPage;