import React from 'react';

export type Offer = {
    id: number;
    icon: string;
    highlight: string;
    category: string;
    title: string;
    provider: string;
    price?: number;
    status: 'visible' | 'hidden';
    placement: 'featured' | 'secondary';
};

export type Coupon = {
    id: number;
    brandName: string;
    brandLogoUrl: string;
    productImageUrl: string;
    discount: string;
    title: string;
    details: string;
    terms: string;
    expiryDate: string;
    status: 'visible' | 'hidden';
    placement: 'featured' | 'secondary';
};

export type CouponInstance = {
    id: string;
    couponId: number;
    status: 'redeemed' | 'active';
    generatedAt: string;
    redeemedAt: string | null;
    redeemedBy: string | null;
};

export type Service = {
    id: number;
    icon: string;
    title: string;
    description: string;
    href?: string;
};

export type Report = {
    id: number;
    type: 'lab' | 'imaging';
    title: string;
    date: string;
    provider: string;
    url: string;
};

export type Specialist = {
    id: number;
    name: string;
    specialty: string;
    address: string;
    phone: string;
    photoUrl: string;
    consultationFee: number;
    biography: string;
    medicalCenterId: string;
    availability: { [date: string]: string[] };
    status: 'visible' | 'hidden';
};

export type MedicalCenter = {
    id: string;
    name: string;
    address: string;
    city: string;
    sector: string;
    logoUrl: string;
    status: 'visible' | 'hidden';
    slogan?: string;
};

export type Associate = {
    id: number;
    name: string;
    logoUrl: string;
    website: string;
    status: 'visible' | 'hidden';
};

export type ScheduleUser = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    medicalCenterId: string;
    status: 'visible' | 'hidden';
    role: 'admin' | 'doctor';
    specialistId?: number;
};

export type Referrer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'approved' | 'pending' | 'rejected';
    referralCode: string;
    createdAt: string;
    activityStatus: 'active' | 'inactive';
};

export type Appointment = {
  id: number;
  specialistId: number;
  patientName: string;
  patientPhone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  status: 'agendada' | 'recordatorio-enviado' | 'confirmada' | 'cancelada' | 'reprogramar';
};