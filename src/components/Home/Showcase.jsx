import React, { useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer'
import InfiniteScroll from 'react-infinite-scroll-component';
import UsersDialog from '../Layouts/UsersDialog'
import { dummyShowcases } from './DummyShowcases';
import ShowcaseItem from './ShowcaseItem';
import SpinLoader from '../Layouts/SpinLoader';


const Showcase = () => {
    const [posts, setPosts] = useState(dummyShowcases);
    console.log(posts);
    const [usersList, setUsersList] = useState([]);
    const [usersDialog, setUsersDialog] = useState(false);


    const fetchMorePosts = () => {
        // 여기에 데이터를 불러오는 로직 추가
        setPosts(prevPosts => [...prevPosts, ...dummyShowcases]);
        console.log("더 많은 게시물을 불러오는 중...");
    };


    return (
        <>
            <div className="flex flex-col w-full lg:w-2/3 sm:mt-6 sm:px-8 mb-8">
                <StoriesContainer />

                {/* {loading &&
                    Array(5).fill("").map((el, i) => (<SkeletonPost key={i} />))
                } */}
                <InfiniteScroll
                    // dataLength={posts.length}
                    // next={fetchMorePosts}
                    // hasMore={posts.length !== totalPosts}
                    // loader={<SpinLoader />}
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={true} // 테스트를 위해 임시로 true 설정
                    loader={<SpinLoader />}
                >
                    <div className="w-full h-full mt-1 sm:mt-6 flex flex-col space-y-4">
                        {posts?.map((post) => (
                            <ShowcaseItem key={post._id} {...post} setUsersDialog={setUsersDialog} setUsersList={setUsersList} />
                        ))}
                    </div>
                </InfiniteScroll>

                {/* <UsersDialog title="Likes" open={usersDialog} onClose={handleClose} usersList={usersList} /> */}

            </div>
        </>
    )
}

export default Showcase