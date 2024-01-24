import React, { useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer'
import InfiniteScroll from 'react-infinite-scroll-component';
import UsersDialog from '../Layouts/UsersDialog'
import { dummyShowcases } from './DummyShowcases';
import ShowcaseItem from './ShowcaseItem';
import SpinLoader from '../Layouts/SpinLoader';
import axios from 'axios';

let currentPage = 1; // request를 보내기 위해 설정하는 page 값

const Showcase = () => {
    const [posts, setPosts] = useState([]);
    console.log(posts);
    const [usersList, setUsersList] = useState([]);
    const [usersDialog, setUsersDialog] = useState(false);
    const [isHasMore, setIsHasMore] = useState(true);


    const fetchMorePosts = async () => {
        // 여기에 데이터를 불러오는 로직 추가
        const {data} = await axios.get(`https://madcamp.dhki.kr/posts/fetch?page=${currentPage}`);

        if(data.success == true){ // 더 가져오는 정보가 있다면
            setPosts(prevPosts => [...prevPosts, ...data.posts]);

            setIsHasMore(true);
            if(posts.length == 0){
                currentPage = 0;
            }else{
                currentPage++;
            }
        }else if (data.success == false){ // 더 가져오는 정보가 없다면
            setIsHasMore(false);
        }

        
        // console.log("더 많은 게시물을 불러오는 중...");
    };


    useEffect(() => { // 처음 게시물 로딩
        fetchMorePosts();
    }, [])


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
                    hasMore={isHasMore}
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