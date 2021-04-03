import A1_1 from '../../assets/sounds/Activity1/A1-1.mp3';
import A1_2 from '../../assets/sounds/Activity1/A1-2.mp3';
import A1_3 from '../../assets/sounds/Activity1/A1-3.mp3';
import A1_4 from '../../assets/sounds/Activity1/A1-4.mp3';
import A1_End from '../../assets/sounds/Activity1/A1-End.mp3';
import A1_G1_Center from '../../assets/sounds/Activity1/A1-G1-Center.mp3';
import A1_G1_G2 from '../../assets/sounds/Activity1/A1-G1-G2.mp3';
import A1_G2_Intro from '../../assets/sounds/Activity1/A1-G2-Intro.mp3';

import A2_1 from '../../assets/sounds/Activity2/A2-1.mp3';
import A2_2 from '../../assets/sounds/Activity2/A2-2.mp3';
import A2_3 from '../../assets/sounds/Activity2/A2-3.mp3';
import A2_4 from '../../assets/sounds/Activity2/A2-4.mp3';
import A2_5 from '../../assets/sounds/Activity2/A2-5.mp3';
import A2_6 from '../../assets/sounds/Activity2/A2-6.mp3';
import A2_7 from '../../assets/sounds/Activity2/A2-7.mp3';
import A2_8 from '../../assets/sounds/Activity2/A2-8.mp3';
import A2_9 from '../../assets/sounds/Activity2/A2-9.mp3';
import A2_10 from '../../assets/sounds/Activity2/A2-10.mp3';
import A2_Game_End from '../../assets/sounds/Activity2/A2-Game-End.mp3';

import I1 from '../../assets/sounds/Intro/Intro1.mp3';
import I2 from '../../assets/sounds/Intro/Intro2.mp3';
import I3 from '../../assets/sounds/Intro/Intro3.mp3';
import I4 from '../../assets/sounds/Intro/Intro4.mp3';
import I5 from '../../assets/sounds/Intro/Intro5.mp3';
import I6 from '../../assets/sounds/Intro/Intro6.mp3';
import I7 from '../../assets/sounds/Intro/Intro7.mp3';
import I8 from '../../assets/sounds/Intro/Intro8.mp3';
import I9 from '../../assets/sounds/Intro/Intro9.mp3';
import I10 from '../../assets/sounds/Intro/Intro10.mp3';
import I11 from '../../assets/sounds/Intro/Intro11.mp3';

export enum SoundTrack {
  Activity1_1,
  Activity1_2,
  Activity1_3,
  Activity1_4,
  Activity1_End,
  Activity1_G1_Center,
  Activity1_G1_G2,
  Activity1_G2_Intro,

  Activity2_1,
  Activity2_2,
  Activity2_3,
  Activity2_4,
  Activity2_5,
  Activity2_6,
  Activity2_7,
  Activity2_8,
  Activity2_9,
  Activity2_10,
  Activity2_Game_End,

  Intro_1,
  Intro_2,
  Intro_3,
  Intro_4,
  Intro_5,
  Intro_6,
  Intro_7,
  Intro_8,
  Intro_9,
  Intro_10,
  Intro_11

}
export const SoundTrackMapping : Record<SoundTrack, any> = {
  [SoundTrack.Activity1_1] : A1_1,
  [SoundTrack.Activity1_2] : A1_2,
  [SoundTrack.Activity1_3] : A1_3,
  [SoundTrack.Activity1_4] : A1_4,
  [SoundTrack.Activity1_End] : A1_End,
  [SoundTrack.Activity1_G1_Center] : A1_G1_Center,
  [SoundTrack.Activity1_G1_G2] : A1_G1_G2,
  [SoundTrack.Activity1_G2_Intro] : A1_G2_Intro,
  
  [SoundTrack.Activity2_1] : A2_1,
  [SoundTrack.Activity2_2] : A2_2,
  [SoundTrack.Activity2_3] : A2_3,
  [SoundTrack.Activity2_4] : A2_4,
  [SoundTrack.Activity2_5] : A2_5,
  [SoundTrack.Activity2_6] : A2_6,
  [SoundTrack.Activity2_7] : A2_7,
  [SoundTrack.Activity2_8] : A2_8,
  [SoundTrack.Activity2_9] : A2_9,
  [SoundTrack.Activity2_10] : A2_10,
  [SoundTrack.Activity2_Game_End] : A2_Game_End,

  [SoundTrack.Intro_1] : I1,
  [SoundTrack.Intro_2] : I2,
  [SoundTrack.Intro_3] : I3,
  [SoundTrack.Intro_4] : I4,
  [SoundTrack.Intro_5] : I5,
  [SoundTrack.Intro_6] : I6,
  [SoundTrack.Intro_7] : I7,
  [SoundTrack.Intro_8] : I8,
  [SoundTrack.Intro_9] : I9,
  [SoundTrack.Intro_10] : I10,
  [SoundTrack.Intro_11] : I11
}
