// src/imports.jsx

// ✅ React and Hooks
export { default as React, useState, useEffect } from 'react';

// ✅ React Router
export { NavLink, Link } from 'react-router-dom';

// ✅ Supabase
export { supabase } from './supabaseClient';
export { SupabaseClient } from '@supabase/supabase-js';

// ✅ Swiper
export { Swiper, SwiperSlide } from 'swiper/react';
export { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// ✅ UI Components
export { Card, CardContent } from './components/ui/card';
export { Button } from './components/ui/button';
