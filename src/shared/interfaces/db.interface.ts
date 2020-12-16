import { Document } from 'mongoose';

export interface User extends Document {
  fullName?: string;
  email: string;
  password: string;
  roles?: string;
  phone?: String;
  address?: String;
  gender?: boolean;
  block?: boolean;
  permission?: [string];
  enterprise?: boolean;
  verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
export interface Blog extends Document {
  blogCategory?: string;
  blogTitle: string;
  slug: string;
  authorId: string;
  blogImage?: String;
  blogText: String;
  created_at?: Date;
  updated_at?: Date;
}

// for course
export interface Comment extends Document {
  id_user_cmt: string;
  id_course: string;
  id_parent_cmt: string;
  content: string;
  isparent: boolean;
  like: number;
  isedit: boolean;
  isannounce: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// rate snapshot user
export interface Rate extends Document {
  id_user: string;
  score: number;
  achievement: [string];
  created_at?: Date;
  updated_at?: Date;
}
//not enough
// course folder save signature of course learn ex: title, description, review
export interface Course extends Document {
  id_course: string;
  index: number;
  title: string;
  description: string;
  // author: string;
  // review: [review];
  joined: [string];
  // album: [album];
  created_at?: Date;
  updated_at?: Date;
}
// help search
export interface album {
  author: string;
  image: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}
// review course learn
export interface review {
  reviewer: string;
  content: string;
  rate: rateStar;
  created_at?: Date;
  updated_at?: Date;
}

export enum rateStar {
  NONE = 0,
  VERY_BAD = 1,
  BAD = 2,
  NORMAL = 3,
  GOOD = 4,
  VERY_GOOD = 5,
}

// coures learn
export interface CourseDetails extends Document {
  id_parent: string;
  index_session: number;
  subtitle: string;
  description: string;
  url_video: string;
  practise: [string];
  created_at?: Date;
  updated_at?: Date;
}
//template course ex: admin define course practise score
export interface Practise extends Document {
  id_course: string;
  index: string;
  title: string;
  question: string;
  answer: string;
  check_answer: [check_answer];
  checked_true: boolean;
  score: number;
  created_at?: Date;
  updated_at?: Date;
}

export enum check_answer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
// progress user course complete present
export interface ProgressUserCourse extends Document {
  id_user: string;
  total_score: number;
  achived: [string];
  course_complete: [CompleteCourse];
}

// secment task practise in session
export interface CompleteCourse {
  id_course: string;
  index_Subcourse: string;
  title: string;
  score: number;
}
// save now status course user errol
export interface UserCoursePresent extends Document {
  id_user: string;
  id_parent_course: string;
  index_session: number;
}
// chart art course
export interface ChartCourseDid extends Document {
  id_user: string;
  score: string;
}
// feedback
export interface feedbackMentor extends Document {}
// mentor help
export interface enterpriceAccount extends Document {}

//payment transaction (bang thanh toan cac giao dich)
export interface payment extends Document {}

//wallet
export interface wallet extends Document {
  id_user: string;
  amount: number;
  currency: string;
}

// transaction
export interface transaction extends Document {}
/**
 * comment:for web dash board
 * review: review course learn
 * feedbackMentor : feekback mentor
 */

export interface Blog extends Document {
  authorId: string;
  title: string;
  desc?: string;
  content: string;
}
