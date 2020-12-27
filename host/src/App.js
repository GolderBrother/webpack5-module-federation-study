import React from "react";
import Slides from "./Slides.jsx";
const RemoteNewsList = React.lazy(() => import("remote/NewsList"));
// const RemoteNewsList = await import("remote/NewsList");

const App = () => (
    <div>
        <h2>本地组件Slides</h2>
        <Slides />
        <h2>远程组件NewsList</h2>
        <React.Suspense fallback="Loading NewsList">
            <RemoteNewsList />
        </React.Suspense>
    </div>
)

export default App;