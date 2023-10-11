import Deso from "deso-protocol/src";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApp from "../../store/app";
import { LinkifyOptions } from "../../utils/Functions";
import Linkify from "linkify-react";
import { DESO_CONFIG, NODE_URL } from "../../utils/Constants";
import defaultBanner from "../../assets/defaultBanner.jpg";
const deso = new Deso(DESO_CONFIG);

function SubProfileCard({ profile }) {
  const { isLoggedIn, user } = useApp();
  const [readMore, setReadMore] = useState(false);
  let payload = null;

  try {
    payload = profile.ExtraData?.CircleIt
      ? JSON.parse(profile.ExtraData.CircleIt)
      : null;
  } catch {
    payload = null;
  }
  const isCircle =
    payload !== null && payload.isCircle === "true" ? true : false;
  const url = isCircle ? `/circle/` : `/u/`;
  let cover = defaultBanner;

  try {
    for (const [key, value] of Object.entries(profile.ExtraData)) {
      if (key === "FeaturedImageURL" && value !== "") {
        cover = value;
      }
    }
  } catch (e) {
    // console.log(e);
  }

  useEffect(() => {
    profile.Description.length > 100 ? setReadMore(true) : setReadMore(false);
  }, [profile.Description]);

  return (
    <>
      <div
        className={`darkenBg border darkenBorder darkenHoverBg rounded-lg ${
          isCircle ? `w-[300px] ` : `w-[250px]`
        } font-normal text-left customShadow flex flex-col items-center justify-start`}>
        {isCircle ? (
          <>
            <div className='flex flex-col w-full'>
              <div
                className='h-28 z-0 mb-3 rounded-tr-lg rounded-tl-lg'
                style={{
                  position: "relative",
                  backgroundImage: `url(${cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
              <div className='flex w-full p-4'>
                <Link
                  to={`${url}${profile.Username}`}
                  className='cursor-pointer relative flex items-center justify-center space-x-1'>
                  <img
                    src={`${NODE_URL}/get-single-profile-picture/${profile.PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`}
                    className='w-10 h-10 darkenBg darkenBorder rounded-full'
                    alt={profile.Username}
                  />
                  <div>
                    <h2 className='extralightText font-bold text-lg'>
                      {profile.ExtraData?.DisplayName
                        ? profile.ExtraData?.DisplayName
                        : profile.Username}
                    </h2>
                    <p className='extralightText hover:underline text-gray-500 dark:text-gray-400 text-sm'>{`${
                      isCircle ? `circle` : `u`
                    }/${profile.Username}`}</p>
                  </div>
                </Link>
              </div>
              <div className='pt-2 w-full p-4'>
                <div>
                  <Linkify options={LinkifyOptions}>
                    {!readMore
                      ? profile.Description
                      : `${profile.Description.substring(0, 200)} `}
                  </Linkify>
                  {readMore && (
                    <span
                      className='brandGradientText cursor-pointer'
                      onClick={() => setReadMore(false)}>
                      ... <span className='ml-1 font-medium'>Read more</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            {/* <div className='py-3 px-4 w-full flex justify-between'>
              <div className='flex flex-col items-center space-y-1'>
                <span className='font-bold text-xl'>{follows}</span>
                <span className='text-sm'>
                  {isCircle ? `Members` : `Followers`}
                </span>
              </div>
              <div className='flex flex-col items-center space-y-1'>
                <span className='font-bold text-xl'>{followings}</span>
                <span className='text-sm'>
                  {isCircle ? `Mods` : `Followings`}
                </span>
              </div>
            </div> */}
          </>
        ) : (
          <>
            <div className='flex flex-col w-full'>
              <div
                className='h-28 z-0 mb-3 rounded-tr-lg rounded-tl-lg'
                style={{
                  position: "relative",
                  backgroundImage: `url(${cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
              <div className='flex flex-col items-center justify-center -mt-12 relative z-10'>
                <Link to={`${url}${profile.Username}`} className='relative'>
                  <img
                    src={`https://node.deso.org/api/v1/get-single-profile-picture/${profile.PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`}
                    className='w-16 h-16 rounded-full border-4 darkenBg darkenBorder'
                    alt={profile.Username}
                  />
                </Link>
                <Link
                  to={`${url}${profile.Username}`}
                  className='cursor-pointer relative mt-2 flex flex-col items-center justify-center'>
                  <h2 className='extralightText m-0 font-bold text-lg'>
                    {profile.ExtraData?.DisplayName
                      ? profile.ExtraData?.DisplayName
                      : profile.Username}
                  </h2>
                  <p className='extralightText hover:underline text-gray-500 dark:text-gray-400 text-sm'>{`${
                    isCircle ? `circle` : `u`
                  }/${profile.Username}`}</p>
                </Link>
              </div>
            </div>
            <div className='flex w-full flex-col p-3'>
              <div className='w-full'>
                <Linkify options={LinkifyOptions}>
                  {!readMore
                    ? profile.Description
                    : `${profile.Description.substring(0, 100)} `}
                </Linkify>
                {readMore && (
                  <span
                    className='brandGradientText cursor-pointer'
                    onClick={() => setReadMore(false)}>
                    ... <span className='ml-1 font-medium'>Read more</span>
                  </span>
                )}
              </div>
              {/* <div className='py-3 px-4 w-full flex justify-between'>
                <div className='flex flex-col items-center space-y-1'>
                  <span className='font-bold text-xl'>{follows}</span>
                  <span className='text-sm'>
                    {isCircle ? `Members` : `Followers`}
                  </span>
                </div>
                <div className='flex flex-col items-center space-y-1'>
                  <span className='font-bold text-xl'>{followings}</span>
                  <span className='text-sm'>
                    {isCircle ? `Mods` : `Followings`}
                  </span>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SubProfileCard;
