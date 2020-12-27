import React from "react";
import NewsList from './NewsList.jsx';
// const RemoteSlides = await import("host/Slides");
const RemoteSlides = React.lazy(() => import("host/Slides"));

const App = () => (
    <div>
        <h2>本地组件NewsList</h2>
        <NewsList />
        <h2>远程组件Slides</h2>
        <React.Suspense fallback="Loading Slides">
            <RemoteSlides />
        </React.Suspense>
    </div>
);

export default App;