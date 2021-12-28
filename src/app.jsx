import React, { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import VideoDetail from "./components/video_detail/video_detail";
import SearchHeader from "./components/search_header/search_header";
import VideoList from "./components/video_list/video_list";

const App = ({ youtube }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    youtube
      .mostPopular()
      .then((videos) => setVideos(videos))
      .catch((error) => console.log("error", error));
  }, [youtube]);

  // UseCallback은 써야될 때만 쓰는 것이 좋다.
  // 간단한 JSX를 이용한 div 태그라던지 button과 같은 이벤트를 처리하는 콜백으로 전달할 때는
  // 새로운 게 전달돼도 re-render가 발생하지 않아서 괜찮다.
  // 중요 point!! UseCallback은 사용해야할 때와 아닐 때를 잘 구분해서 사용하자
  const search = useCallback(
    (videoName) => {
      youtube
        .search(videoName)
        .then((videos) => setVideos(videos))
        .catch((error) => console.log("error", error));
      setSelectedVideo(null);
    },
    [youtube]
  ); // 빈 배열을 전달하면 함수를 한 번만 만들고 계속 동일한 오브젝트 사용

  const selectVideo = useCallback((video) => {
    setSelectedVideo(video);
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
