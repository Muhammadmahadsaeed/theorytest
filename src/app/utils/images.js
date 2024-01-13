import React from 'react'
import { View, Dimensions } from 'react-native'

// old app assets images
import MapSearch from '../../assets/app-images/search.svg'
import MapPin from '../../assets/app-images/pin.svg'
import Avatar from '../../assets/app-images/avatar.svg'
import UpArrow from '../../assets/app-images/up-arrow.svg'
import MapPinWhite from '../../assets/app-images/white-pin.svg'
import Alarm from '../../assets/app-images/alarm.svg'
import SearchColorFull from '../../assets/app-images/search-color-full.svg'
import MedicalHistory from '../../assets/app-images/medical-history.svg'
import NewsPaper from '../../assets/app-images/newspaper.svg'
import NewsPaper1 from '../../assets/app-images/newspaper1.svg'
import Old from '../../assets/app-images/old.svg'
import DoctorWriting from '../../assets/app-images/doctor-writing.svg'
import HomeWhite from '../../assets/app-images/home-white.svg'
import HomeBlack from '../../assets/app-images/home-black.svg'
import Appointment from '../../assets/app-images/appointment.svg'
import EmptyCalender from '../../assets/app-images/empty-clender.svg'
import ClockRect from '../../assets/app-images/clock-rect.svg'
import SearchGreen from '../../assets/app-images/search-green.svg'
import AppointmentDeactive from '../../assets/app-images/appointment-deactive.svg'
import ChatDeactive from '../../assets/app-images/chat-deactive.svg'
import UserDeactive from '../../assets/app-images/user-deactive.svg'
import AppointmentActive from '../../assets/app-images/appointment-active.svg'
import UsertActive from '../../assets/app-images/user-active.svg'
import ChatActive from '../../assets/app-images/chat-active.svg'
import CalenderCircle from '../../assets/app-images/calender-circle.svg'
import AppointmentType from '../../assets/app-images/appointment-type.svg'
import SearchFill from '../../assets/app-images/search-fill.svg'
import Star from '../../assets/app-images/star.svg'
import PinBlue from '../../assets/app-images/pin-blue.svg'
// import Share from '../../assets/app-images/share.svg'
import Chat from '../../assets/app-images/chat.svg'
import Line from '../../assets/app-images/line.svg'
import StarCircle from '../../assets/app-images/star-circle.svg'
import HeartCircle from '../../assets/app-images/heart-circle.svg'
import Google from '../../assets/app-images/google.svg'
import Facebook from '../../assets/app-images/facebook.svg'
import NotificationRed from '../../assets/app-images/notification-red.svg'
import Phone from '../../assets/app-images/phone.svg'
import History from '../../assets/app-images/history.svg'
import Pay from '../../assets/app-images/pay.svg'
import HeadSet from '../../assets/app-images/headset.svg'
import Exit from '../../assets/app-images/exit.svg'
import CustomPin from '../../assets/app-images/custom-pin.svg'
import ForwardArrow from '../../assets/app-images/forward-arrow.svg'
import AddProfile from '../../assets/app-images/add-profile.svg'
import ChatQuestion from '../../assets/app-images/chat-question.svg'
import Time from '../../assets/app-images/time.svg'
// import InfoCircle from '../../assets/app-images/info-circle.svg'
import Camera from '../../assets/app-images/ar-camera.svg'
import Send from '../../assets/app-images/send.svg'
import BackCircleWhite from '../../assets/app-images/back-circle-white.svg'
import CameraBlack from '../../assets/app-images/ar-camera-black.svg'
import CalenderBlue from '../../assets/app-images/calendar-blue.svg'
import Menu from '../../assets/app-images/menu.svg'
import ShareWhite from '../../assets/app-images/share-white.svg'
import Calender from '../../assets/app-images/calendar.svg'
import Whatsapp from '../../assets/app-images/whatsapp.svg'
import Insta from '../../assets/app-images/insta.svg'
import Twitter from '../../assets/app-images/twitter.svg'
import FB from '../../assets/app-images/fb.svg'
import Messenger from '../../assets/app-images/messenger.svg'
import Sun from '../../assets/app-images/sun.svg'
import Moon from '../../assets/app-images/moon.svg'
import Login from '../../assets/app-images/login.svg'
import Check from '../../assets/app-images/check_icon.svg'
import CalendarPurple from '../../assets/app-images/calendar-purple.svg'
import Direction from '../../assets/app-images/direction.svg'
import Clock from '../../assets/app-images/clock_blue.svg'
import Eye from '../../assets/app-images/eye.svg'
import PlusCircle from '../../assets/app-images/plus-circle.svg'
import Visa from '../../assets/app-images/visa.svg'
import Voucher from '../../assets/app-images/voucher.svg'

import Back from '../../assets/app-images/back.svg'
import BackIconAr from '../../assets/app-images/back_icon_ar.svg'

// new app asset start
import AppLogo from '../../assets/images/Logo.svg'
import Care01 from '../../assets/images/care01.svg'
import Care02 from '../../assets/images/care02.svg'
import Care03 from '../../assets/images/care03.svg'
import Care04 from '../../assets/images/care04.svg'
import AddressBook from '../../assets/images/address-book.svg'
import Alert from '../../assets/images/alert.svg'
import ClockWatch from '../../assets/images/clock-watch.svg'
import Review from '../../assets/images/review.svg'
import Question from '../../assets/images/question.svg'
import BackLeft from '../../assets/images/back-left.svg'
import SearchFile from '../../assets/images/search-file.svg'
import ForwardEn from '../../assets/images/forward_en.svg'
import Timer from '../../assets/images/timer.svg'
import ReviewFile from '../../assets/images/review-file.svg'
import Smile from '../../assets/images/smile.svg'
import ForwardEnWhite from '../../assets/images/forward_en_white.svg'
import BackWardArrow from '../../assets/images/backward-arrow.svg'
import Video from '../../assets/images/video.svg'
import VideoPlayer from '../../assets/images/video-player.svg'
import VideoWhite from '../../assets/images/video-white.svg'
import Exclamation from '../../assets/images/exclamation.svg'
import Certificate from '../../assets/images/certificate.svg'
import ReviewQuestion from '../../assets/images/review-question.svg'
import Flag from '../../assets/images/flag.svg'
import RedFlag from '../../assets/images/red-flag.svg'
import Heart from '../../assets/images/heart.svg'
import RedHeart from '../../assets/images/heart-red.svg'
import TickBox from '../../assets/images/tick-box.svg'
import CrossRound from '../../assets/images/cross-round.svg'
import InfoCircle from '../../assets/images/info-circle.svg'
import Help from '../../assets/images/help.svg'
import Share from '../../assets/images/share.svg'
import Support from '../../assets/images/support.svg'
import Clear from '../../assets/images/clear.svg'
import Crown from '../../assets/images/crown.svg'
import ZoomPlus from '../../assets/images/zoom-plus.svg'

export const ZoomPlusIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ZoomPlus width="100%" height="100%" />
     </View>
)
export const CrownIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Crown width="100%" height="100%" />
     </View>
)
export const ClearIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Clear width="100%" height="100%" />
     </View>
)
export const SupportIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Support width="100%" height="100%" />
     </View>
)
export const ShareIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Share width="100%" height="100%" />
     </View>
)
export const HelpIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Help width="100%" height="100%" />
     </View>
)
export const InfoCircleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <InfoCircle width="100%" height="100%"/>
     </View>
)
export const CrossRoundIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CrossRound width="100%" height="100%"/>
     </View>
)
export const TickBoxIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <TickBox width="100%" height="100%"/>
     </View>
)
export const RedHeartIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <RedHeart width="100%" height="100%"/>
     </View>
)
export const HeartIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Heart width="100%" height="100%"/>
     </View>
)
export const RedFlagIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <RedFlag width="100%" height="100%"/>
     </View>
)
export const FlagIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Flag width="100%" height="100%"/>
     </View>
)
export const ReviewQuestionIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ReviewQuestion width="100%" height="100%"/>
     </View>
)
export const CertificateIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Certificate width="100%" height="100%"/>
     </View>
)
export const ExclamationIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Exclamation width="100%" height="100%"/>
     </View>
)
export const VideoWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <VideoWhite width="100%" height="100%"/>
     </View>
)
export const VideoPlayerIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <VideoPlayer width="100%" height="100%"/>
     </View>
)
export const VideoIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Video width="100%" height="100%"/>
     </View>
)
export const BackWardArrowIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <BackWardArrow width="100%" height="100%"/>
     </View>
)
export const ForwardEnWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ForwardEnWhite width="100%" height="100%"/>
     </View>
)
export const SmileIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Smile width="100%" height="100%"/>
     </View>
)
export const ReviewFileIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ReviewFile width="100%" height="100%" />
     </View>
)
export const TimerIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Timer width="100%" height="100%" />
     </View>
)
export const ForwardEnIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ForwardEn width="100%" height="100%"/>
     </View>
)
export const SearchFileIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <SearchFile width="100%" height="100%" />
     </View>
)
export const BackLeftIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <BackLeft width="100%" height="100%" />
     </View>
)
export const QuestionIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Question width="100%" height="100%" />
     </View>
)
export const ReviewIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Review width="100%" height="100%" />
     </View>
)
export const ClockWatchIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ClockWatch width="100%" height="100%" />
     </View>
)
export const AlertIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Alert width="100%" height="100%" />
     </View>
)
export const AddressBookIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AddressBook width="100%" height="100%" />
     </View>
)

export const Care04Icon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Care04 width="100%" height="100%" />
     </View>
)
export const Care03Icon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Care03 width="100%" height="100%" />
     </View>
)
export const Care02Icon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Care02 width="100%" height="100%" />
     </View>
)
export const Care01Icon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Care01 width="100%" height="100%" />
     </View>
)
export const AppLogoIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AppLogo width="100%" height="100%" />
     </View>
)







export const BackIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Back width="100%" height="100%" fill="#000" />
     </View>
)
export const BackIconArIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <BackIconAr width="100%" height="100%" fill="#000" />
     </View>
)


export const VoucherIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Voucher width="100%" height="100%" fill="#000" />
     </View>
)
export const VisaIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Visa width="100%" height="100%" fill="#000" />
     </View>
)
export const PlusCircleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <PlusCircle width="100%" height="100%" />
     </View>
)
export const EyeIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Eye width="100%" height="100%" />
     </View>
)
export const ClockIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Clock width="100%" height="100%" />
     </View>
)
export const DirectionIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Direction width="100%" height="100%" />
     </View>
)
export const CalendarPurpleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CalendarPurple width="100%" height="100%" />
     </View>
)
export const CheckIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Check width="100%" height="100%" />
     </View>
)
export const LoginIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Login width="100%" height="100%" />
     </View>
)
export const MoonIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Moon width="100%" height="100%" />
     </View>
)
export const SunIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Sun width="100%" height="100%" />
     </View>
)
export const MessengerIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Messenger width="100%" height="100%" />
     </View>
)
export const FBIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <FB width="100%" height="100%" />
     </View>
)
export const TwitterIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Twitter width="100%" height="100%" />
     </View>
)
export const InstaIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Insta width="100%" height="100%" />
     </View>
)
export const WhatsappIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Whatsapp width="100%" height="100%" />
     </View>
)
export const CalenderIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Calender width="100%" height="100%" />
     </View>
)
export const ShareWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ShareWhite width="100%" height="100%" />
     </View>
)
export const MenuIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Menu width="100%" height="100%" />
     </View>
)
export const CalenderBlueIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CalenderBlue width="100%" height="100%" />
     </View>
)
export const CameraBlackIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CameraBlack width="100%" height="100%" />
     </View>
)
export const BackCircleWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <BackCircleWhite width="100%" height="100%" />
     </View>
)

export const SendIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Send width="100%" height="100%" />
     </View>
)
export const CameraIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Camera width="100%" height="100%" />
     </View>
)
// export const InfoCircleIcon = ({ svgStyle }) => (
//      <View style={{ ...svgStyle }}>
//           <InfoCircle width="100%" height="100%" />
//      </View>
// )
export const TimeIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Time width="100%" height="100%" />
     </View>
)
export const ChatQuestionIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ChatQuestion width="100%" height="100%" />
     </View>
)
export const AddProfileIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AddProfile width="100%" height="100%" />
     </View>
)
export const ForwardArrowIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ForwardArrow width="100%" height="100%" />
     </View>
)
export const CustomPinIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CustomPin width="100%" height="100%" />
     </View>
)
export const ExitIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Exit width="100%" height="100%" />
     </View>
)

export const HeadSetIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <HeadSet width="100%" height="100%" />
     </View>
)
export const PayIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Pay width="100%" height="100%" />
     </View>
)
export const HistoryIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <History width="100%" height="100%" />
     </View>
)
export const PhoneIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Phone width="100%" height="100%" />
     </View>
)
export const NotificationRedIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <NotificationRed width="100%" height="100%" />
     </View>
)
export const FacebookIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Facebook width="100%" height="100%" />
     </View>
)
export const GoogleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Google width="100%" height="100%" />
     </View>
)
export const HeartCircleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <HeartCircle width="100%" height="100%" />
     </View>
)
export const StarCircleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <StarCircle width="100%" height="100%" />
     </View>
)
export const LineIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Line width="100%" height="100%" />
     </View>
)
export const ChatIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Chat width="100%" height="100%" />
     </View>
)
// export const ShareIcon = ({ svgStyle }) => (
//      <View style={{ ...svgStyle }}>
//           <Share width="100%" height="100%" />
//      </View>
// )
export const PinBlueIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <PinBlue width="100%" height="100%" />
     </View>
)
export const StarIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Star width="100%" height="100%" />
     </View>
)
export const SearchFillIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <SearchFill width="100%" height="100%" />
     </View>
)
export const AppointmentTypeIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AppointmentType width="100%" height="100%" />
     </View>
)
export const CalenderCircleIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <CalenderCircle width="100%" height="100%" />
     </View>
)
export const ChatActiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ChatActive width="100%" height="100%" />
     </View>
)
export const UsertActiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <UsertActive width="100%" height="100%" />
     </View>
)
export const AppointmentActiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AppointmentActive width="100%" height="100%" />
     </View>
)

export const UserDeactiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <UserDeactive width="100%" height="100%" />
     </View>
)
export const ChatDeactiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ChatDeactive width="100%" height="100%" />
     </View>
)
export const AppointmentDeactiveIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <AppointmentDeactive width="100%" height="100%" />
     </View>
)
export const SearchGreenIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <SearchGreen width="100%" height="100%" />
     </View>
)
export const ClockRectIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <ClockRect width="100%" height="100%" />
     </View>
)
export const EmptyCalenderIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <EmptyCalender width="100%" height="100%" />
     </View>
)
export const AppointmentIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Appointment width="100%" height="100%" />
     </View>
)
export const HomeBlackIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <HomeBlack width="100%" height="100%" />
     </View>
)
export const HomeWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <HomeWhite width="100%" height="100%" />
     </View>
)
export const DoctorWritingIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <DoctorWriting width="100%" height="100%" />
     </View>
)
export const OldIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Old width="100%" height="100%" />
     </View>
)
export const NewsPaper1Icon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <NewsPaper1 width="100%" height="100%" />
     </View>
)
export const NewsPaperIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <NewsPaper width="100%" height="100%" />
     </View>
)
export const MedicalHistoryIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <MedicalHistory width="100%" height="100%" />
     </View>
)
export const SearchColorFullIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <SearchColorFull width="100%" height="100%" />
     </View>
)
export const AlarmIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Alarm width="100%" height="100%" />
     </View>
)
export const MapPinWhiteIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <MapPinWhite width="100%" height="100%" />
     </View>
)
export const UpArrowIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <UpArrow width="100%" height="100%" />
     </View>
)
export const AvatarIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <Avatar width="100%" height="100%" />
     </View>
)
export const MapPinIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <MapPin width="100%" height="100%" />
     </View>
)
export const SearchIcon = ({ svgStyle }) => (
     <View style={{ ...svgStyle }}>
          <MapSearch width="100%" height="100%" />
     </View>
)


export const custom_pin = require('../../assets/app-images/pin.png')
export const profile = require('../../assets/app-images/profile.png')
export const oval = require('../../assets/app-images/oval.png')
export const news = require('../../assets/app-images/news.png')
export const imagegallery = require('../../assets/app-images/image-gallery.png')
export const custom_marker = require('../../assets/app-images/marker.png')
export const profile_placeholder = require('../../assets/app-images/profile_placeholder.png')
export const fb1 = require('../../assets/app-images/facebook.png')
export const tw2 = require('../../assets/app-images/twitter.png')
export const call18 = require('../../assets/app-images/telephone-call.png')


export const govuk = require('../../assets/images/govuk.png')
export const info = require('../../assets/images/info.png')