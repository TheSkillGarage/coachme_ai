
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
            <div className=''>Job Search
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>
                    <CustomOtpInput
                        length={6}
                        onChange={handleOtpChange}
                        onComplete={handleOtpComplete}
                        size="lg"
                        shape="rounded"
                    />
                </div>

                <div className="max-w-sm mx-auto mt-20 space-y-6">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        leftIcon={Mail}
                        helperText="We'll never share your email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        leftIcon={Lock}
                        variant="filled"
                        rounded="lg"
                    />

                    <Input
                        label="Disabled"
                        placeholder="Can't type here"
                        disabled
                    />

                    <Input
                        label="Error Example"
                        placeholder="Try again"
                        error="Invalid email address"
                    />
                </div>
            </div>
            <div className="max-w-4xl mx-auto mt-10 space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Users</h2>

                <Table<User>
                    columns={[
                        { key: "name", label: "Name" },
                        { key: "email", label: "Email" },
                        { key: "role", label: "Role" },
                        {
                            key: "actions",
                            label: "Actions",
                            render: (user) => (
                                <button className="p-2 hover:bg-gray-100 rounded-md">
                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                </button>
                            ),
                        },
                    ]}
                    data={users}
                    striped

                    hoverable
                    itemsPerPage={3}
                    onRowClick={(user) => alert(`Clicked: ${user.name}`)}
                />
            </div>
        </HelmetLayout>
    )
}
