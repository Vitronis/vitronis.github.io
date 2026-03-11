import { Heart, Activity, Thermometer, Droplet, TrendingUp, Zap, Flame, Droplets } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { HealthAnalysisModal } from '../modals/HealthAnalysisModal';

const hrData24h = [
  { time: '00:00', value: 54 },
  { time: '01:00', value: 54 },
  { time: '02:00', value: 54 },
  { time: '03:00', value: 55 },
  { time: '04:00', value: 50 },
  { time: '05:00', value: 48 },
  { time: '06:00', value: 67 },
  { time: '07:00', value: 73 },
  { time: '08:00', value: 59 },
  { time: '09:00', value: 81 },
  { time: '10:00', value: 70 },
  { time: '11:00', value: 72 },
  { time: '12:00', value: 75 },
  { time: '13:00', value: 68 },
  { time: '14:00', value: 70 },
  { time: '15:00', value: 69 },
  { time: '16:00', value: 64 },
  { time: '17:00', value: 93 },
  { time: '18:00', value: 76 },
  { time: '19:00', value: 99 },
  { time: '20:00', value: 71 },
  { time: '21:00', value: 74 },
  { time: '22:00', value: 72 },
  { time: '23:00', value: 58 },
];

const hrData7d = [
  { time: 'Mo 00:00', value: 54 },
  { time: 'Mo 01:00', value: 52 },
  { time: 'Mo 02:00', value: 60 },
  { time: 'Mo 03:00', value: 59 },
  { time: 'Mo 04:00', value: 53 },
  { time: 'Mo 05:00', value: 51 },
  { time: 'Mo 06:00', value: 77 },
  { time: 'Mo 07:00', value: 71 },
  { time: 'Mo 08:00', value: 80 },
  { time: 'Mo 09:00', value: 66 },
  { time: 'Mo 10:00', value: 72 },
  { time: 'Mo 11:00', value: 69 },
  { time: 'Mo 12:00', value: 65 },
  { time: 'Mo 13:00', value: 74 },
  { time: 'Mo 14:00', value: 64 },
  { time: 'Mo 15:00', value: 74 },
  { time: 'Mo 16:00', value: 73 },
  { time: 'Mo 17:00', value: 82 },
  { time: 'Mo 18:00', value: 86 },
  { time: 'Mo 19:00', value: 72 },
  { time: 'Mo 20:00', value: 79 },
  { time: 'Mo 21:00', value: 74 },
  { time: 'Mo 22:00', value: 76 },
  { time: 'Mo 23:00', value: 55 },
  { time: 'Di 00:00', value: 55 },
  { time: 'Di 01:00', value: 54 },
  { time: 'Di 02:00', value: 55 },
  { time: 'Di 03:00', value: 52 },
  { time: 'Di 04:00', value: 51 },
  { time: 'Di 05:00', value: 60 },
  { time: 'Di 06:00', value: 75 },
  { time: 'Di 07:00', value: 75 },
  { time: 'Di 08:00', value: 89 },
  { time: 'Di 09:00', value: 62 },
  { time: 'Di 10:00', value: 69 },
  { time: 'Di 11:00', value: 73 },
  { time: 'Di 12:00', value: 64 },
  { time: 'Di 13:00', value: 69 },
  { time: 'Di 14:00', value: 80 },
  { time: 'Di 15:00', value: 82 },
  { time: 'Di 16:00', value: 81 },
  { time: 'Di 17:00', value: 97 },
  { time: 'Di 18:00', value: 86 },
  { time: 'Di 19:00', value: 78 },
  { time: 'Di 20:00', value: 73 },
  { time: 'Di 21:00', value: 67 },
  { time: 'Di 22:00', value: 65 },
  { time: 'Di 23:00', value: 57 },
  { time: 'Mi 00:00', value: 60 },
  { time: 'Mi 01:00', value: 53 },
  { time: 'Mi 02:00', value: 58 },
  { time: 'Mi 03:00', value: 56 },
  { time: 'Mi 04:00', value: 52 },
  { time: 'Mi 05:00', value: 55 },
  { time: 'Mi 06:00', value: 65 },
  { time: 'Mi 07:00', value: 61 },
  { time: 'Mi 08:00', value: 71 },
  { time: 'Mi 09:00', value: 77 },
  { time: 'Mi 10:00', value: 86 },
  { time: 'Mi 11:00', value: 68 },
  { time: 'Mi 12:00', value: 73 },
  { time: 'Mi 13:00', value: 67 },
  { time: 'Mi 14:00', value: 72 },
  { time: 'Mi 15:00', value: 59 },
  { time: 'Mi 16:00', value: 58 },
  { time: 'Mi 17:00', value: 90 },
  { time: 'Mi 18:00', value: 86 },
  { time: 'Mi 19:00', value: 85 },
  { time: 'Mi 20:00', value: 63 },
  { time: 'Mi 21:00', value: 67 },
  { time: 'Mi 22:00', value: 65 },
  { time: 'Mi 23:00', value: 56 },
  { time: 'Do 00:00', value: 53 },
  { time: 'Do 01:00', value: 50 },
  { time: 'Do 02:00', value: 57 },
  { time: 'Do 03:00', value: 56 },
  { time: 'Do 04:00', value: 56 },
  { time: 'Do 05:00', value: 58 },
  { time: 'Do 06:00', value: 76 },
  { time: 'Do 07:00', value: 75 },
  { time: 'Do 08:00', value: 67 },
  { time: 'Do 09:00', value: 73 },
  { time: 'Do 10:00', value: 74 },
  { time: 'Do 11:00', value: 82 },
  { time: 'Do 12:00', value: 86 },
  { time: 'Do 13:00', value: 86 },
  { time: 'Do 14:00', value: 72 },
  { time: 'Do 15:00', value: 73 },
  { time: 'Do 16:00', value: 65 },
  { time: 'Do 17:00', value: 84 },
  { time: 'Do 18:00', value: 84 },
  { time: 'Do 19:00', value: 82 },
  { time: 'Do 20:00', value: 74 },
  { time: 'Do 21:00', value: 62 },
  { time: 'Do 22:00', value: 71 },
  { time: 'Do 23:00', value: 58 },
  { time: 'Fr 00:00', value: 56 },
  { time: 'Fr 01:00', value: 50 },
  { time: 'Fr 02:00', value: 54 },
  { time: 'Fr 03:00', value: 56 },
  { time: 'Fr 04:00', value: 57 },
  { time: 'Fr 05:00', value: 55 },
  { time: 'Fr 06:00', value: 64 },
  { time: 'Fr 07:00', value: 74 },
  { time: 'Fr 08:00', value: 59 },
  { time: 'Fr 09:00', value: 84 },
  { time: 'Fr 10:00', value: 86 },
  { time: 'Fr 11:00', value: 75 },
  { time: 'Fr 12:00', value: 76 },
  { time: 'Fr 13:00', value: 71 },
  { time: 'Fr 14:00', value: 78 },
  { time: 'Fr 15:00', value: 71 },
  { time: 'Fr 16:00', value: 66 },
  { time: 'Fr 17:00', value: 84 },
  { time: 'Fr 18:00', value: 78 },
  { time: 'Fr 19:00', value: 90 },
  { time: 'Fr 20:00', value: 67 },
  { time: 'Fr 21:00', value: 72 },
  { time: 'Fr 22:00', value: 59 },
  { time: 'Fr 23:00', value: 55 },
  { time: 'Sa 00:00', value: 56 },
  { time: 'Sa 01:00', value: 54 },
  { time: 'Sa 02:00', value: 61 },
  { time: 'Sa 03:00', value: 56 },
  { time: 'Sa 04:00', value: 55 },
  { time: 'Sa 05:00', value: 53 },
  { time: 'Sa 06:00', value: 69 },
  { time: 'Sa 07:00', value: 78 },
  { time: 'Sa 08:00', value: 76 },
  { time: 'Sa 09:00', value: 62 },
  { time: 'Sa 10:00', value: 69 },
  { time: 'Sa 11:00', value: 72 },
  { time: 'Sa 12:00', value: 61 },
  { time: 'Sa 13:00', value: 83 },
  { time: 'Sa 14:00', value: 65 },
  { time: 'Sa 15:00', value: 63 },
  { time: 'Sa 16:00', value: 65 },
  { time: 'Sa 17:00', value: 77 },
  { time: 'Sa 18:00', value: 80 },
  { time: 'Sa 19:00', value: 72 },
  { time: 'Sa 20:00', value: 76 },
  { time: 'Sa 21:00', value: 73 },
  { time: 'Sa 22:00', value: 60 },
  { time: 'Sa 23:00', value: 62 },
  { time: 'So 00:00', value: 54 },
  { time: 'So 01:00', value: 54 },
  { time: 'So 02:00', value: 54 },
  { time: 'So 03:00', value: 55 },
  { time: 'So 04:00', value: 50 },
  { time: 'So 05:00', value: 48 },
  { time: 'So 06:00', value: 67 },
  { time: 'So 07:00', value: 73 },
  { time: 'So 08:00', value: 59 },
  { time: 'So 09:00', value: 81 },
  { time: 'So 10:00', value: 70 },
  { time: 'So 11:00', value: 72 },
  { time: 'So 12:00', value: 75 },
  { time: 'So 13:00', value: 68 },
  { time: 'So 14:00', value: 70 },
  { time: 'So 15:00', value: 69 },
  { time: 'So 16:00', value: 64 },
  { time: 'So 17:00', value: 93 },
  { time: 'So 18:00', value: 76 },
  { time: 'So 19:00', value: 99 },
  { time: 'So 20:00', value: 71 },
  { time: 'So 21:00', value: 74 },
  { time: 'So 22:00', value: 72 },
  { time: 'So 23:00', value: 58 },
];

const bpData24h = [
  { time: '00:00', systolic: 106, diastolic: 65 },
  { time: '01:00', systolic: 98, diastolic: 67 },
  { time: '02:00', systolic: 105, diastolic: 62 },
  { time: '03:00', systolic: 97, diastolic: 66 },
  { time: '04:00', systolic: 104, diastolic: 56 },
  { time: '05:00', systolic: 106, diastolic: 57 },
  { time: '06:00', systolic: 128, diastolic: 72 },
  { time: '07:00', systolic: 137, diastolic: 78 },
  { time: '08:00', systolic: 108, diastolic: 70 },
  { time: '09:00', systolic: 113, diastolic: 82 },
  { time: '10:00', systolic: 109, diastolic: 73 },
  { time: '11:00', systolic: 137, diastolic: 69 },
  { time: '12:00', systolic: 106, diastolic: 73 },
  { time: '13:00', systolic: 107, diastolic: 76 },
  { time: '14:00', systolic: 121, diastolic: 82 },
  { time: '15:00', systolic: 118, diastolic: 80 },
  { time: '16:00', systolic: 106, diastolic: 71 },
  { time: '17:00', systolic: 145, diastolic: 76 },
  { time: '18:00', systolic: 123, diastolic: 83 },
  { time: '19:00', systolic: 132, diastolic: 73 },
  { time: '20:00', systolic: 114, diastolic: 75 },
  { time: '21:00', systolic: 124, diastolic: 68 },
  { time: '22:00', systolic: 109, diastolic: 65 },
  { time: '23:00', systolic: 113, diastolic: 60 },
];

const bpData7d = [
  { time: 'Mo 00:00', systolic: 108, diastolic: 59 },
  { time: 'Mo 01:00', systolic: 107, diastolic: 67 },
  { time: 'Mo 02:00', systolic: 100, diastolic: 70 },
  { time: 'Mo 03:00', systolic: 117, diastolic: 59 },
  { time: 'Mo 04:00', systolic: 104, diastolic: 61 },
  { time: 'Mo 05:00', systolic: 104, diastolic: 66 },
  { time: 'Mo 06:00', systolic: 114, diastolic: 72 },
  { time: 'Mo 07:00', systolic: 125, diastolic: 78 },
  { time: 'Mo 08:00', systolic: 112, diastolic: 83 },
  { time: 'Mo 09:00', systolic: 115, diastolic: 75 },
  { time: 'Mo 10:00', systolic: 117, diastolic: 79 },
  { time: 'Mo 11:00', systolic: 108, diastolic: 67 },
  { time: 'Mo 12:00', systolic: 136, diastolic: 79 },
  { time: 'Mo 13:00', systolic: 132, diastolic: 79 },
  { time: 'Mo 14:00', systolic: 122, diastolic: 66 },
  { time: 'Mo 15:00', systolic: 115, diastolic: 81 },
  { time: 'Mo 16:00', systolic: 113, diastolic: 73 },
  { time: 'Mo 17:00', systolic: 120, diastolic: 83 },
  { time: 'Mo 18:00', systolic: 140, diastolic: 84 },
  { time: 'Mo 19:00', systolic: 124, diastolic: 77 },
  { time: 'Mo 20:00', systolic: 102, diastolic: 66 },
  { time: 'Mo 21:00', systolic: 125, diastolic: 67 },
  { time: 'Mo 22:00', systolic: 117, diastolic: 75 },
  { time: 'Mo 23:00', systolic: 97, diastolic: 57 },
  { time: 'Di 00:00', systolic: 109, diastolic: 69 },
  { time: 'Di 01:00', systolic: 107, diastolic: 65 },
  { time: 'Di 02:00', systolic: 116, diastolic: 65 },
  { time: 'Di 03:00', systolic: 95, diastolic: 60 },
  { time: 'Di 04:00', systolic: 109, diastolic: 68 },
  { time: 'Di 05:00', systolic: 103, diastolic: 64 },
  { time: 'Di 06:00', systolic: 112, diastolic: 74 },
  { time: 'Di 07:00', systolic: 116, diastolic: 68 },
  { time: 'Di 08:00', systolic: 119, diastolic: 71 },
  { time: 'Di 09:00', systolic: 121, diastolic: 77 },
  { time: 'Di 10:00', systolic: 113, diastolic: 74 },
  { time: 'Di 11:00', systolic: 109, diastolic: 70 },
  { time: 'Di 12:00', systolic: 137, diastolic: 73 },
  { time: 'Di 13:00', systolic: 108, diastolic: 84 },
  { time: 'Di 14:00', systolic: 138, diastolic: 72 },
  { time: 'Di 15:00', systolic: 109, diastolic: 81 },
  { time: 'Di 16:00', systolic: 116, diastolic: 83 },
  { time: 'Di 17:00', systolic: 150, diastolic: 75 },
  { time: 'Di 18:00', systolic: 150, diastolic: 82 },
  { time: 'Di 19:00', systolic: 136, diastolic: 84 },
  { time: 'Di 20:00', systolic: 111, diastolic: 78 },
  { time: 'Di 21:00', systolic: 115, diastolic: 65 },
  { time: 'Di 22:00', systolic: 103, diastolic: 72 },
  { time: 'Di 23:00', systolic: 115, diastolic: 60 },
  { time: 'Mi 00:00', systolic: 95, diastolic: 64 },
  { time: 'Mi 01:00', systolic: 103, diastolic: 62 },
  { time: 'Mi 02:00', systolic: 110, diastolic: 55 },
  { time: 'Mi 03:00', systolic: 109, diastolic: 63 },
  { time: 'Mi 04:00', systolic: 110, diastolic: 62 },
  { time: 'Mi 05:00', systolic: 104, diastolic: 66 },
  { time: 'Mi 06:00', systolic: 99, diastolic: 78 },
  { time: 'Mi 07:00', systolic: 120, diastolic: 80 },
  { time: 'Mi 08:00', systolic: 123, diastolic: 71 },
  { time: 'Mi 09:00', systolic: 116, diastolic: 81 },
  { time: 'Mi 10:00', systolic: 108, diastolic: 75 },
  { time: 'Mi 11:00', systolic: 118, diastolic: 69 },
  { time: 'Mi 12:00', systolic: 112, diastolic: 72 },
  { time: 'Mi 13:00', systolic: 121, diastolic: 67 },
  { time: 'Mi 14:00', systolic: 101, diastolic: 84 },
  { time: 'Mi 15:00', systolic: 123, diastolic: 81 },
  { time: 'Mi 16:00', systolic: 118, diastolic: 83 },
  { time: 'Mi 17:00', systolic: 112, diastolic: 93 },
  { time: 'Mi 18:00', systolic: 126, diastolic: 85 },
  { time: 'Mi 19:00', systolic: 122, diastolic: 81 },
  { time: 'Mi 20:00', systolic: 132, diastolic: 69 },
  { time: 'Mi 21:00', systolic: 139, diastolic: 73 },
  { time: 'Mi 22:00', systolic: 108, diastolic: 74 },
  { time: 'Mi 23:00', systolic: 105, diastolic: 65 },
  { time: 'Do 00:00', systolic: 103, diastolic: 66 },
  { time: 'Do 01:00', systolic: 106, diastolic: 64 },
  { time: 'Do 02:00', systolic: 104, diastolic: 65 },
  { time: 'Do 03:00', systolic: 112, diastolic: 62 },
  { time: 'Do 04:00', systolic: 100, diastolic: 65 },
  { time: 'Do 05:00', systolic: 109, diastolic: 63 },
  { time: 'Do 06:00', systolic: 122, diastolic: 70 },
  { time: 'Do 07:00', systolic: 114, diastolic: 80 },
  { time: 'Do 08:00', systolic: 114, diastolic: 81 },
  { time: 'Do 09:00', systolic: 125, diastolic: 81 },
  { time: 'Do 10:00', systolic: 118, diastolic: 72 },
  { time: 'Do 11:00', systolic: 121, diastolic: 79 },
  { time: 'Do 12:00', systolic: 102, diastolic: 93 },
  { time: 'Do 13:00', systolic: 141, diastolic: 79 },
  { time: 'Do 14:00', systolic: 101, diastolic: 84 },
  { time: 'Do 15:00', systolic: 120, diastolic: 74 },
  { time: 'Do 16:00', systolic: 114, diastolic: 76 },
  { time: 'Do 17:00', systolic: 110, diastolic: 90 },
  { time: 'Do 18:00', systolic: 136, diastolic: 81 },
  { time: 'Do 19:00', systolic: 122, diastolic: 78 },
  { time: 'Do 20:00', systolic: 106, diastolic: 66 },
  { time: 'Do 21:00', systolic: 125, diastolic: 68 },
  { time: 'Do 22:00', systolic: 122, diastolic: 75 },
  { time: 'Do 23:00', systolic: 109, diastolic: 64 },
  { time: 'Fr 00:00', systolic: 110, diastolic: 66 },
  { time: 'Fr 01:00', systolic: 95, diastolic: 64 },
  { time: 'Fr 02:00', systolic: 113, diastolic: 62 },
  { time: 'Fr 03:00', systolic: 106, diastolic: 73 },
  { time: 'Fr 04:00', systolic: 111, diastolic: 67 },
  { time: 'Fr 05:00', systolic: 99, diastolic: 58 },
  { time: 'Fr 06:00', systolic: 121, diastolic: 73 },
  { time: 'Fr 07:00', systolic: 117, diastolic: 81 },
  { time: 'Fr 08:00', systolic: 121, diastolic: 80 },
  { time: 'Fr 09:00', systolic: 103, diastolic: 84 },
  { time: 'Fr 10:00', systolic: 115, diastolic: 66 },
  { time: 'Fr 11:00', systolic: 104, diastolic: 87 },
  { time: 'Fr 12:00', systolic: 112, diastolic: 80 },
  { time: 'Fr 13:00', systolic: 103, diastolic: 83 },
  { time: 'Fr 14:00', systolic: 108, diastolic: 82 },
  { time: 'Fr 15:00', systolic: 120, diastolic: 80 },
  { time: 'Fr 16:00', systolic: 112, diastolic: 71 },
  { time: 'Fr 17:00', systolic: 120, diastolic: 81 },
  { time: 'Fr 18:00', systolic: 112, diastolic: 79 },
  { time: 'Fr 19:00', systolic: 128, diastolic: 91 },
  { time: 'Fr 20:00', systolic: 123, diastolic: 65 },
  { time: 'Fr 21:00', systolic: 113, diastolic: 76 },
  { time: 'Fr 22:00', systolic: 111, diastolic: 71 },
  { time: 'Fr 23:00', systolic: 112, diastolic: 66 },
  { time: 'Sa 00:00', systolic: 101, diastolic: 64 },
  { time: 'Sa 01:00', systolic: 104, diastolic: 68 },
  { time: 'Sa 02:00', systolic: 111, diastolic: 57 },
  { time: 'Sa 03:00', systolic: 98, diastolic: 61 },
  { time: 'Sa 04:00', systolic: 103, diastolic: 58 },
  { time: 'Sa 05:00', systolic: 110, diastolic: 62 },
  { time: 'Sa 06:00', systolic: 118, diastolic: 73 },
  { time: 'Sa 07:00', systolic: 120, diastolic: 72 },
  { time: 'Sa 08:00', systolic: 120, diastolic: 75 },
  { time: 'Sa 09:00', systolic: 120, diastolic: 68 },
  { time: 'Sa 10:00', systolic: 130, diastolic: 79 },
  { time: 'Sa 11:00', systolic: 116, diastolic: 68 },
  { time: 'Sa 12:00', systolic: 119, diastolic: 68 },
  { time: 'Sa 13:00', systolic: 115, diastolic: 82 },
  { time: 'Sa 14:00', systolic: 127, diastolic: 81 },
  { time: 'Sa 15:00', systolic: 126, diastolic: 75 },
  { time: 'Sa 16:00', systolic: 129, diastolic: 68 },
  { time: 'Sa 17:00', systolic: 115, diastolic: 86 },
  { time: 'Sa 18:00', systolic: 138, diastolic: 72 },
  { time: 'Sa 19:00', systolic: 131, diastolic: 86 },
  { time: 'Sa 20:00', systolic: 120, diastolic: 75 },
  { time: 'Sa 21:00', systolic: 108, diastolic: 75 },
  { time: 'Sa 22:00', systolic: 114, diastolic: 80 },
  { time: 'Sa 23:00', systolic: 102, diastolic: 59 },
  { time: 'So 00:00', systolic: 106, diastolic: 65 },
  { time: 'So 01:00', systolic: 98, diastolic: 67 },
  { time: 'So 02:00', systolic: 105, diastolic: 62 },
  { time: 'So 03:00', systolic: 97, diastolic: 66 },
  { time: 'So 04:00', systolic: 104, diastolic: 56 },
  { time: 'So 05:00', systolic: 106, diastolic: 57 },
  { time: 'So 06:00', systolic: 128, diastolic: 72 },
  { time: 'So 07:00', systolic: 137, diastolic: 78 },
  { time: 'So 08:00', systolic: 108, diastolic: 70 },
  { time: 'So 09:00', systolic: 113, diastolic: 82 },
  { time: 'So 10:00', systolic: 109, diastolic: 73 },
  { time: 'So 11:00', systolic: 137, diastolic: 69 },
  { time: 'So 12:00', systolic: 106, diastolic: 73 },
  { time: 'So 13:00', systolic: 107, diastolic: 76 },
  { time: 'So 14:00', systolic: 121, diastolic: 82 },
  { time: 'So 15:00', systolic: 118, diastolic: 80 },
  { time: 'So 16:00', systolic: 106, diastolic: 71 },
  { time: 'So 17:00', systolic: 145, diastolic: 76 },
  { time: 'So 18:00', systolic: 123, diastolic: 83 },
  { time: 'So 19:00', systolic: 132, diastolic: 73 },
  { time: 'So 20:00', systolic: 114, diastolic: 75 },
  { time: 'So 21:00', systolic: 124, diastolic: 68 },
  { time: 'So 22:00', systolic: 109, diastolic: 65 },
  { time: 'So 23:00', systolic: 113, diastolic: 60 },
];

const tempData24h = [
  { time: '00:00', value: 36.5 },
  { time: '02:00', value: 36.4 },
  { time: '04:00', value: 36.3 },
  { time: '06:00', value: 36.4 },
  { time: '08:00', value: 36.6 },
  { time: '10:00', value: 36.7 },
  { time: '12:00', value: 36.9 },
  { time: '14:00', value: 36.8 },
  { time: '16:00', value: 36.8 },
  { time: '18:00', value: 36.7 },
  { time: '20:00', value: 36.6 },
  { time: '22:00', value: 36.5 },
  { time: '24:00', value: 36.5 },
];

const tempData7d = [
  { time: 'Mo', value: 36.6 },
  { time: 'Di', value: 36.7 },
  { time: 'Mi', value: 36.5 },
  { time: 'Do', value: 36.6 },
  { time: 'Fr', value: 36.8 },
  { time: 'Sa', value: 36.5 },
  { time: 'So', value: 36.6 },
];

const spo2Data24h = [
  { time: '00:00', value: 96.2 },
  { time: '01:00', value: 98.2 },
  { time: '02:00', value: 97.9 },
  { time: '03:00', value: 96.8 },
  { time: '04:00', value: 95.7 },
  { time: '05:00', value: 99.7 },
  { time: '06:00', value: 97.2 },
  { time: '07:00', value: 97.9 },
  { time: '08:00', value: 96.6 },
  { time: '09:00', value: 99.0 },
  { time: '10:00', value: 97.8 },
  { time: '11:00', value: 98.6 },
  { time: '12:00', value: 97.0 },
  { time: '13:00', value: 97.2 },
  { time: '14:00', value: 99.0 },
  { time: '15:00', value: 99.2 },
  { time: '16:00', value: 98.2 },
  { time: '17:00', value: 95.5 },
  { time: '18:00', value: 97.2 },
  { time: '19:00', value: 97.1 },
  { time: '20:00', value: 97.9 },
  { time: '21:00', value: 98.3 },
  { time: '22:00', value: 96.7 },
  { time: '23:00', value: 97.3 },
];

const spo2Data7d = [
  { time: 'Mo 00:00', value: 97.2 },
  { time: 'Mo 01:00', value: 98.1 },
  { time: 'Mo 02:00', value: 97.6 },
  { time: 'Mo 03:00', value: 98.1 },
  { time: 'Mo 04:00', value: 96.8 },
  { time: 'Mo 05:00', value: 97.0 },
  { time: 'Mo 06:00', value: 97.7 },
  { time: 'Mo 07:00', value: 97.6 },
  { time: 'Mo 08:00', value: 97.0 },
  { time: 'Mo 09:00', value: 96.7 },
  { time: 'Mo 10:00', value: 98.0 },
  { time: 'Mo 11:00', value: 97.3 },
  { time: 'Mo 12:00', value: 98.2 },
  { time: 'Mo 13:00', value: 99.0 },
  { time: 'Mo 14:00', value: 96.8 },
  { time: 'Mo 15:00', value: 98.1 },
  { time: 'Mo 16:00', value: 96.8 },
  { time: 'Mo 17:00', value: 98.4 },
  { time: 'Mo 18:00', value: 99.0 },
  { time: 'Mo 19:00', value: 98.3 },
  { time: 'Mo 20:00', value: 98.0 },
  { time: 'Mo 21:00', value: 97.6 },
  { time: 'Mo 22:00', value: 97.6 },
  { time: 'Mo 23:00', value: 98.8 },
  { time: 'Di 00:00', value: 95.7 },
  { time: 'Di 01:00', value: 97.4 },
  { time: 'Di 02:00', value: 97.7 },
  { time: 'Di 03:00', value: 98.9 },
  { time: 'Di 04:00', value: 97.7 },
  { time: 'Di 05:00', value: 96.8 },
  { time: 'Di 06:00', value: 95.7 },
  { time: 'Di 07:00', value: 96.6 },
  { time: 'Di 08:00', value: 98.3 },
  { time: 'Di 09:00', value: 97.0 },
  { time: 'Di 10:00', value: 98.2 },
  { time: 'Di 11:00', value: 97.6 },
  { time: 'Di 12:00', value: 97.3 },
  { time: 'Di 13:00', value: 97.0 },
  { time: 'Di 14:00', value: 98.0 },
  { time: 'Di 15:00', value: 97.2 },
  { time: 'Di 16:00', value: 97.6 },
  { time: 'Di 17:00', value: 98.5 },
  { time: 'Di 18:00', value: 97.4 },
  { time: 'Di 19:00', value: 97.9 },
  { time: 'Di 20:00', value: 97.5 },
  { time: 'Di 21:00', value: 97.3 },
  { time: 'Di 22:00', value: 96.7 },
  { time: 'Di 23:00', value: 97.9 },
  { time: 'Mi 00:00', value: 97.4 },
  { time: 'Mi 01:00', value: 98.3 },
  { time: 'Mi 02:00', value: 98.4 },
  { time: 'Mi 03:00', value: 98.4 },
  { time: 'Mi 04:00', value: 98.3 },
  { time: 'Mi 05:00', value: 99.0 },
  { time: 'Mi 06:00', value: 98.4 },
  { time: 'Mi 07:00', value: 96.2 },
  { time: 'Mi 08:00', value: 98.5 },
  { time: 'Mi 09:00', value: 98.0 },
  { time: 'Mi 10:00', value: 97.5 },
  { time: 'Mi 11:00', value: 96.9 },
  { time: 'Mi 12:00', value: 97.8 },
  { time: 'Mi 13:00', value: 99.0 },
  { time: 'Mi 14:00', value: 97.1 },
  { time: 'Mi 15:00', value: 98.4 },
  { time: 'Mi 16:00', value: 96.5 },
  { time: 'Mi 17:00', value: 96.8 },
  { time: 'Mi 18:00', value: 98.7 },
  { time: 'Mi 19:00', value: 98.1 },
  { time: 'Mi 20:00', value: 96.2 },
  { time: 'Mi 21:00', value: 99.6 },
  { time: 'Mi 22:00', value: 96.6 },
  { time: 'Mi 23:00', value: 96.5 },
  { time: 'Do 00:00', value: 97.9 },
  { time: 'Do 01:00', value: 96.8 },
  { time: 'Do 02:00', value: 98.8 },
  { time: 'Do 03:00', value: 96.9 },
  { time: 'Do 04:00', value: 97.8 },
  { time: 'Do 05:00', value: 98.5 },
  { time: 'Do 06:00', value: 98.2 },
  { time: 'Do 07:00', value: 97.1 },
  { time: 'Do 08:00', value: 99.3 },
  { time: 'Do 09:00', value: 96.9 },
  { time: 'Do 10:00', value: 97.9 },
  { time: 'Do 11:00', value: 97.5 },
  { time: 'Do 12:00', value: 96.7 },
  { time: 'Do 13:00', value: 98.3 },
  { time: 'Do 14:00', value: 96.0 },
  { time: 'Do 15:00', value: 97.4 },
  { time: 'Do 16:00', value: 98.3 },
  { time: 'Do 17:00', value: 98.3 },
  { time: 'Do 18:00', value: 97.1 },
  { time: 'Do 19:00', value: 96.2 },
  { time: 'Do 20:00', value: 96.3 },
  { time: 'Do 21:00', value: 97.4 },
  { time: 'Do 22:00', value: 96.3 },
  { time: 'Do 23:00', value: 97.4 },
  { time: 'Fr 00:00', value: 97.8 },
  { time: 'Fr 01:00', value: 97.1 },
  { time: 'Fr 02:00', value: 97.3 },
  { time: 'Fr 03:00', value: 97.6 },
  { time: 'Fr 04:00', value: 98.0 },
  { time: 'Fr 05:00', value: 97.8 },
  { time: 'Fr 06:00', value: 99.0 },
  { time: 'Fr 07:00', value: 97.7 },
  { time: 'Fr 08:00', value: 95.8 },
  { time: 'Fr 09:00', value: 99.1 },
  { time: 'Fr 10:00', value: 96.6 },
  { time: 'Fr 11:00', value: 96.3 },
  { time: 'Fr 12:00', value: 98.3 },
  { time: 'Fr 13:00', value: 98.2 },
  { time: 'Fr 14:00', value: 98.1 },
  { time: 'Fr 15:00', value: 97.7 },
  { time: 'Fr 16:00', value: 97.4 },
  { time: 'Fr 17:00', value: 96.1 },
  { time: 'Fr 18:00', value: 97.3 },
  { time: 'Fr 19:00', value: 97.6 },
  { time: 'Fr 20:00', value: 97.0 },
  { time: 'Fr 21:00', value: 96.6 },
  { time: 'Fr 22:00', value: 96.5 },
  { time: 'Fr 23:00', value: 97.2 },
  { time: 'Sa 00:00', value: 96.8 },
  { time: 'Sa 01:00', value: 97.9 },
  { time: 'Sa 02:00', value: 95.7 },
  { time: 'Sa 03:00', value: 98.3 },
  { time: 'Sa 04:00', value: 96.8 },
  { time: 'Sa 05:00', value: 98.7 },
  { time: 'Sa 06:00', value: 97.3 },
  { time: 'Sa 07:00', value: 98.6 },
  { time: 'Sa 08:00', value: 96.1 },
  { time: 'Sa 09:00', value: 97.4 },
  { time: 'Sa 10:00', value: 97.9 },
  { time: 'Sa 11:00', value: 97.3 },
  { time: 'Sa 12:00', value: 97.5 },
  { time: 'Sa 13:00', value: 96.7 },
  { time: 'Sa 14:00', value: 98.1 },
  { time: 'Sa 15:00', value: 98.0 },
  { time: 'Sa 16:00', value: 99.3 },
  { time: 'Sa 17:00', value: 97.9 },
  { time: 'Sa 18:00', value: 97.5 },
  { time: 'Sa 19:00', value: 98.0 },
  { time: 'Sa 20:00', value: 97.3 },
  { time: 'Sa 21:00', value: 97.6 },
  { time: 'Sa 22:00', value: 97.5 },
  { time: 'Sa 23:00', value: 97.8 },
  { time: 'So 00:00', value: 96.2 },
  { time: 'So 01:00', value: 98.2 },
  { time: 'So 02:00', value: 97.9 },
  { time: 'So 03:00', value: 96.8 },
  { time: 'So 04:00', value: 95.7 },
  { time: 'So 05:00', value: 99.7 },
  { time: 'So 06:00', value: 97.2 },
  { time: 'So 07:00', value: 97.9 },
  { time: 'So 08:00', value: 96.6 },
  { time: 'So 09:00', value: 99.0 },
  { time: 'So 10:00', value: 97.8 },
  { time: 'So 11:00', value: 98.6 },
  { time: 'So 12:00', value: 97.0 },
  { time: 'So 13:00', value: 97.2 },
  { time: 'So 14:00', value: 99.0 },
  { time: 'So 15:00', value: 99.2 },
  { time: 'So 16:00', value: 98.2 },
  { time: 'So 17:00', value: 95.5 },
  { time: 'So 18:00', value: 97.2 },
  { time: 'So 19:00', value: 97.1 },
  { time: 'So 20:00', value: 97.9 },
  { time: 'So 21:00', value: 98.3 },
  { time: 'So 22:00', value: 96.7 },
  { time: 'So 23:00', value: 97.3 },
];

const ekgData24h = [
  { time: '00:00', value: 62 },
  { time: '02:00', value: 58 },
  { time: '04:00', value: 56 },
  { time: '06:00', value: 60 },
  { time: '08:00', value: 68 },
  { time: '10:00', value: 72 },
  { time: '12:00', value: 75 },
  { time: '14:00', value: 73 },
  { time: '16:00', value: 70 },
  { time: '18:00', value: 68 },
  { time: '20:00', value: 65 },
  { time: '22:00', value: 63 },
  { time: '24:00', value: 60 },
];

const ekgData7d = [
  { time: 'Mo', value: 67 },
  { time: 'Di', value: 69 },
  { time: 'Mi', value: 66 },
  { time: 'Do', value: 68 },
  { time: 'Fr', value: 70 },
  { time: 'Sa', value: 65 },
  { time: 'So', value: 67 },
];

const caloriesData24h = [
  { time: '00:00', value: 45 },
  { time: '02:00', value: 38 },
  { time: '04:00', value: 35 },
  { time: '06:00', value: 42 },
  { time: '08:00', value: 125 },
  { time: '10:00', value: 95 },
  { time: '12:00', value: 160 },
  { time: '14:00', value: 85 },
  { time: '16:00', value: 145 },
  { time: '18:00', value: 110 },
  { time: '20:00', value: 75 },
  { time: '22:00', value: 55 },
  { time: '24:00', value: 48 },
];

const caloriesData7d = [
  { time: 'Mo', value: 2150 },
  { time: 'Di', value: 2340 },
  { time: 'Mi', value: 2080 },
  { time: 'Do', value: 2220 },
  { time: 'Fr', value: 2410 },
  { time: 'Sa', value: 1980 },
  { time: 'So', value: 2100 },
];

const bloodSugarData24h = [
  { time: '00:00', value: 90 },
  { time: '02:00', value: 88 },
  { time: '04:00', value: 87 },
  { time: '06:00', value: 89 },
  { time: '08:00', value: 92 },
  { time: '10:00', value: 94 },
  { time: '12:00', value: 96 },
  { time: '14:00', value: 95 },
  { time: '16:00', value: 93 },
  { time: '18:00', value: 91 },
  { time: '20:00', value: 89 },
  { time: '22:00', value: 88 },
  { time: '24:00', value: 90 },
];

const bloodSugarData7d = [
  { time: 'Mo', value: 91 },
  { time: 'Di', value: 93 },
  { time: 'Mi', value: 89 },
  { time: 'Do', value: 92 },
  { time: 'Fr', value: 94 },
  { time: 'Sa', value: 88 },
  { time: 'So', value: 90 },
];

interface ChartCardProps {
  icon: typeof Heart;
  title: string;
  data: any[];
  dataKeys: string[];
  colors: string[];
  unit?: string;
  onClick?: () => void;
}

function ChartCard({ icon: Icon, title, data, dataKeys, colors, unit, onClick }: ChartCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} strokeWidth={2} className="text-[#2F80ED]" />
        <h2 className="text-[12px] font-medium text-[#1F2937]">
          {title}
        </h2>
      </div>
      
      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height={140} minWidth={0}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              style={{ fontSize: '8px' }}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              style={{ fontSize: '8px' }}
              tickLine={false}
              unit={unit}
            />
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index]} 
                strokeWidth={1.5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface VerlaufProps {
  onVitalClick: (type: 'heart' | 'blood-pressure' | 'oxygen' | 'temperature' | 'ekg' | 'calories' | 'blood-sugar') => void;
}

export function Verlauf({ onVitalClick }: VerlaufProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h');
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="px-4 pt-2 pb-4 space-y-3">
        {/* Segmented Control */}
        <div className="flex gap-1.5 p-1 bg-[#F7F8FA] rounded-lg">
          <button
            onClick={() => setTimeRange('24h')}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
              timeRange === '24h'
                ? 'bg-white text-[#2F80ED] shadow-sm'
                : 'text-[#6B7280]'
            }`}
          >
            Letzte 24 Stunden
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
              timeRange === '7d'
                ? 'bg-white text-[#2F80ED] shadow-sm'
                : 'text-[#6B7280]'
            }`}
          >
            Letzte 7 Tage
          </button>
        </div>

        {/* Health Analysis Button */}
        <div 
          className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-[#2F80ED]"
          onClick={() => setShowAnalysis(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp size={16} strokeWidth={2} className="text-[#2F80ED]" />
            <span className="text-[12px] font-medium text-[#2F80ED]">
              Umfassende Gesundheitsanalyse anzeigen
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-3">
          <ChartCard
            icon={Heart}
            title="Herzfrequenz"
            data={timeRange === '24h' ? hrData24h : hrData7d}
            dataKeys={['value']}
            colors={['#2F80ED']}
            unit=" BPM"
            onClick={() => onVitalClick('heart')}
          />
          
          <ChartCard
            icon={Activity}
            title="Blutdruck"
            data={timeRange === '24h' ? bpData24h : bpData7d}
            dataKeys={['systolic', 'diastolic']}
            colors={['#2F80ED', '#27AE60']}
            unit=" mmHg"
            onClick={() => onVitalClick('blood-pressure')}
          />

          <ChartCard
            icon={Droplets}
            title="Sauerstoffsättigung (SpO2)"
            data={timeRange === '24h' ? spo2Data24h : spo2Data7d}
            dataKeys={['value']}
            colors={['#2F80ED']}
            unit=" %"
            onClick={() => onVitalClick('oxygen')}
          />
          
          <ChartCard
            icon={Thermometer}
            title="Körpertemperatur"
            data={timeRange === '24h' ? tempData24h : tempData7d}
            dataKeys={['value']}
            colors={['#EB5757']}
            unit=" °C"
            onClick={() => onVitalClick('temperature')}
          />

          <ChartCard
            icon={Zap}
            title="EKG"
            data={timeRange === '24h' ? ekgData24h : ekgData7d}
            dataKeys={['value']}
            colors={['#27AE60']}
            unit=" BPM"
            onClick={() => onVitalClick('ekg')}
          />

          <ChartCard
            icon={Flame}
            title="Kalorienverbrauch"
            data={timeRange === '24h' ? caloriesData24h : caloriesData7d}
            dataKeys={['value']}
            colors={['#F2994A']}
            unit={timeRange === '24h' ? ' kcal/h' : ' kcal'}
            onClick={() => onVitalClick('calories')}
          />

          <ChartCard
            icon={Droplet}
            title="Blutzuckergehalt"
            data={timeRange === '24h' ? bloodSugarData24h : bloodSugarData7d}
            dataKeys={['value']}
            colors={['#FF6347']}
            unit=" mg/dL"
            onClick={() => onVitalClick('blood-sugar')}
          />
        </div>
      </div>

      {/* Health Analysis Modal */}
      <HealthAnalysisModal 
        isOpen={showAnalysis} 
        onClose={() => setShowAnalysis(false)}
        source="verlauf"
      />
    </div>
  );
}
