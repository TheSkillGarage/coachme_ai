
import { Mail, Lock, MoreVertical } from 'lucide-react';
import { Input } from '../../components/ui/input/input';
import { CustomOtpInput } from '../../components/ui/otpinput';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import { Table } from '../../components/ui/table';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export default function Main() {


    const users: User[] = [
        { id: 1, name: "Alice Johnson", email: "alice@email.com", role: "Admin" },
        { id: 2, name: "Bob Smith", email: "bob@email.com", role: "User" },
        { id: 3, name: "Charlie Brown", email: "charlie@email.com", role: "Partner" },
        { id: 4, name: "Diane Lee", email: "diane@email.com", role: "Partner" },
        { id: 5, name: "Eve Adams", email: "eve@email.com", role: "User" },
        { id: 6, name: "Frank White", email: "frank@email.com", role: "Admin" },
    ];

    const handleOtpChange = (otp: string) => {
        console.log("OTP Changed:", otp);
    };

    const handleOtpComplete = (otp: string) => {
        console.log("OTP Complete:", otp);
        alert(`Entered OTP: ${otp}`);
    };


    const tags: HelmetProps = {
        pageTitle: 'Job Search',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>

        </HelmetLayout>
    )
}
