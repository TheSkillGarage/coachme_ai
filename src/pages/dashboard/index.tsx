
import { useState } from 'react';
import { Avatar } from '../../components/ui/avatar';
import Button from '../../components/ui/button/button';
import { CustomDropdown } from '../../components/ui/dropdown';
import { Modal } from '../../components/ui/modal';
import HelmetLayout, { type HelmetProps } from '../../layouts/helmetlayout';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { AlertBanner } from '../../components/ui/alertbanner';
import { TopCard } from '../../components/topcard';
import { BarChart, Briefcase } from 'lucide-react';
import { Switch } from '../../components/ui/switch';
import { Checkbox } from '../../components/ui/checkbox';
import { Drawer } from '../../components/ui/drawer';
import Skeleton from '../../components/ui/skeleton';
import Carousel from '../../components/ui/carousel';
export default function Main() {
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const tags: HelmetProps = {
        pageTitle: 'User Dashboard',
        description: ""
    }
    return (
        <HelmetLayout {...tags}>
            <div className=''>Dashboard
                <CustomDropdown
                    trigger={<Button className='bg-primary-500 cursor-pointer' variant="outline">Open Menu</Button>}
                    width="w-72"
                    align="right"
                    className='w-[10rem]'
                >
                    <div className="p-4">
                        <p className="font-semibold text-gray-800">Your Custom Content</p>
                        <div className="mt-2 space-y-2">
                            <button className="block w-full text-left hover:bg-gray-100 rounded-md px-3 py-2">
                                Option 1
                            </button>
                            <button className="block w-full text-left hover:bg-gray-100 rounded-md px-3 py-2">
                                Option 2
                            </button>
                        </div>
                    </div>
                </CustomDropdown>
                <Avatar src="/images/u" className='' name="Blessing Bella" size="lg" />
                <Button onClick={() => setOpen(true)}>Open Modal</Button>

                <Modal open={open} onClose={() => setOpen(false)} width="max-w-lg">
                    <div className="p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800">Custom Modal</h2>
                        <p className="text-gray-600">
                            This is a fully customizable modal. You can adjust the width, padding,
                            background, and even animation if you like.
                        </p>
                        <div className="flex justify-end">
                            <Button onClick={() => setOpen(false)}>Close</Button>
                        </div>
                    </div>
                </Modal>
                <Card className=''>
                    <h3 className="text-lg font-semibold text-gray-800">Card Title</h3>
                    <p className="text-gray-600 mt-2">
                        This is a simple, clean, reusable card component.
                    </p>
                </Card>
                <Badge variant="outline" className='bg-green-200 text-green-700 border-none' color="green">
                    Success
                </Badge>
                <AlertBanner className="bg-red-50 text-red-700 border border-red-200">
                    <div className="flex items-center gap-3">
                        <span className="font-semibold">Blessing Bella</span>
                        <p>Your resume has been uploaded successfully. Click continue to proceed.</p>
                    </div>
                </AlertBanner>
                <div className='flex justify-between gap-x-2'>
                    <TopCard
                        title="Find Jobs"
                        description="Search thousands of job listings"
                        icon={<Briefcase className="w-4 h-4" />}
                        onActionClick={() => console.log("Navigate to Jobs")}
                    />
                    <TopCard
                        title="Find Jobs"
                        description="Search thousands of job listings"
                        icon={<Briefcase className="w-4 h-4 bg-red" />}
                        onActionClick={() => console.log("Navigate to Jobs")}
                    />
                    <TopCard
                        title="Find Jobs"
                        description="Search thousands of job listings"
                        icon={<Briefcase className="w-4 h-4" />}
                        onActionClick={() => console.log("Navigate to Jobs")}
                    />
                    <TopCard
                        title="Analytics"
                        description="View reports and insights"
                        icon={<BarChart className="w-4 h-4 text-green-700" />}
                        iconBg="bg-green-100 text-green-700"
                        onActionClick={() => console.log("Analytics clicked")}
                    />

                </div>
                <Switch
                    size="lg"
                    activeColor="bg-primary-500"
                    inactiveColor="bg-gray-300"
                    checked={isActive}
                    onChange={(val) => setIsActive(val)}
                />
                <Checkbox
                    checked={isActive}
                    onChange={setIsActive}
                    label="Subscribe to newsletter"
                    color="bg-primary-500"
                    size="lg"
                />
                <Button onClick={() => setMenuOpen(true)} className="bg-primary-500 text-white">
                    Open Drawer
                </Button>
                <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="bottom" title="Menu">
                    <ul>
                        <li>Dashboard</li>
                        <li>Events</li>
                        <li>Settings</li>
                    </ul>
                </Drawer>
                <div className="space-y-4">
                    <Skeleton width={20} height={20} className='rounded-full' />
                    <Skeleton width="50%" height={20} rounded="lg" />
                    <Skeleton className='bg-grey-100' height={40} rounded={false} animated={false} />
                </div>
                <div className="w-full max-w-xl mx-auto mt-10">
                    <Carousel interval={3000} autoPlay={false}>
                        <div className="h-60 bg-purple-500 flex items-center justify-center text-white text-2xl rounded">
                            Slide 1
                        </div>
                        <div className="h-60 bg-primary-400 flex items-center justify-center text-white text-2xl rounded">
                            Slide 2
                        </div>
                        <div className="h-60 bg-grey-400 flex items-center justify-center text-white text-2xl rounded">
                            Slide 3
                        </div>
                    </Carousel>
                </div>
            </div>
        </HelmetLayout>
    )
}
