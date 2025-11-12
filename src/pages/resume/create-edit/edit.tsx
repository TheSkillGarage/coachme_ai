import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input/input";
import Button from "../../../components/ui/button/button";
import { ArrowLeft, FilePlayIcon, Plus, Trash2 } from "lucide-react";
import * as yup from "yup";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";

interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
}

interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Education {
    degree: string;
    course: string;
    institution: string;
    graduationDate: string;
    location: string;
}

type ErrorMessages = Partial<Record<string, string | string[]>>;

export default function EditResume() {
    const navigate = useNavigate();

    // ✅ Yup Schemas
    const personalSchema = yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        phone: yup.string().required("Phone number is required"),
        location: yup.string().required("Location is required"),
        summary: yup.string().required("Professional summary is required"),
    });

    const experienceSchema = yup.object().shape({
        jobTitle: yup.string().required("Job title is required"),
        company: yup.string().required("Company name is required"),
        startDate: yup.string().required("Start date is required"),
        endDate: yup.string().required("End date is required"),
        description: yup.string().required("Description is required"),
    });

    const educationSchema = yup.object().shape({
        degree: yup.string().required("Degree is required"),
        course: yup.string().required("Course is required"),
        institution: yup.string().required("Institution is required"),
        graduationDate: yup.string().required("Graduation date is required"),
        location: yup.string().required("Location is required"),
    });

    // ✅ States
    const [formData, setFormData] = useState<PersonalData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        summary: "",
    });

    const [experiences, setExperiences] = useState<Experience[]>([
        { jobTitle: "", company: "", startDate: "", endDate: "", description: "" },
    ]);

    const [educations, setEducations] = useState<Education[]>([
        { degree: "", course: "", institution: "", graduationDate: "", location: "" },
    ]);

    const [errors, setErrors] = useState<{
        personal?: ErrorMessages;
        experiences?: ErrorMessages[];
        educations?: ErrorMessages[];
    }>({});

    // ✅ Prefill with Faker data (only in dev mode)
    useEffect(() => {
        if (import.meta.env.MODE === "development") {
            setFormData({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                location: `${faker.location.city()}, ${faker.location.country()}`,
                summary: faker.person.bio(),
            });

            setExperiences([
                {
                    jobTitle: faker.person.jobTitle(),
                    company: faker.company.name(),
                    startDate: faker.date.past({ years: 3 }).toISOString().split("T")[0],
                    endDate: faker.date.recent({ days: 90 }).toISOString().split("T")[0],
                    description: faker.lorem.sentences(3),
                },
            ]);

            setEducations([
                {
                    degree: "Bachelor's Degree",
                    course: faker.person.jobArea(),
                    institution: faker.company.name(),
                    graduationDate: faker.date.past({ years: 5 }).toISOString().split("T")[0],
                    location: faker.location.city(),
                },
            ]);
        }
    }, []);

    // ✅ Handlers
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        try {
            await personalSchema.validateAt(name, { ...formData, [name]: value });
            setErrors((prev) => ({ ...prev, personal: { ...prev.personal, [name]: undefined } }));
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => ({ ...prev, personal: { ...prev.personal, [name]: err.message } }));
            }
        }
    };

    const handleExperienceChange = async (index: number, field: keyof Experience, value: string) => {
        const updated = [...experiences];
        updated[index][field] = value;
        setExperiences(updated);

        try {
            await experienceSchema.validateAt(field, updated[index]);
            setErrors((prev) => {
                const newErrors = prev.experiences ? [...prev.experiences] : [];
                if (!newErrors[index]) newErrors[index] = {};
                newErrors[index][field] = undefined;
                return { ...prev, experiences: newErrors };
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => {
                    const newErrors = prev.experiences ? [...prev.experiences] : [];
                    if (!newErrors[index]) newErrors[index] = {};
                    newErrors[index][field] = err.message;
                    return { ...prev, experiences: newErrors };
                });
            }
        }
    };

    const handleEducationChange = async (index: number, field: keyof Education, value: string) => {
        const updated = [...educations];
        updated[index][field] = value;
        setEducations(updated);

        try {
            await educationSchema.validateAt(field, updated[index]);
            setErrors((prev) => {
                const newErrors = prev.educations ? [...prev.educations] : [];
                if (!newErrors[index]) newErrors[index] = {};
                newErrors[index][field] = undefined;
                return { ...prev, educations: newErrors };
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                setErrors((prev) => {
                    const newErrors = prev.educations ? [...prev.educations] : [];
                    if (!newErrors[index]) newErrors[index] = {};
                    newErrors[index][field] = err.message;
                    return { ...prev, educations: newErrors };
                });
            }
        }
    };

    const addExperience = async () => {
        try {
            await experienceSchema.validate(experiences[experiences.length - 1], { abortEarly: false });
            setExperiences([
                ...experiences,
                {
                    jobTitle: faker.person.jobTitle(),
                    company: faker.company.name(),
                    startDate: faker.date.past({ years: 2 }).toISOString().split("T")[0],
                    endDate: faker.date.recent({ days: 60 }).toISOString().split("T")[0],
                    description: faker.lorem.sentences(2),
                },
            ]);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: ErrorMessages = {};
                err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                setErrors((prev) => ({ ...prev, experiences: [...(prev.experiences || []), fieldErrors] }));
            }
        }
    };

    const addEducation = async () => {
        try {
            await educationSchema.validate(educations[educations.length - 1], { abortEarly: false });
            setEducations([
                ...educations,
                {
                    degree: "Bachelor's Degree",
                    course: faker.person.jobArea(),
                    institution: faker.company.name(),
                    graduationDate: faker.date.past({ years: 7 }).toISOString().split("T")[0],
                    location: faker.location.city(),
                },
            ]);
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: ErrorMessages = {};
                err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                setErrors((prev) => ({ ...prev, educations: [...(prev.educations || []), fieldErrors] }));
            }
        }
    };

    const removeExperience = (index: number) => {
        setExperiences((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => ({
            ...prev,
            experiences: prev.experiences ? prev.experiences.filter((_, i) => i !== index) : [],
        }));
    };

    const removeEducation = (index: number) => {
        setEducations((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => ({
            ...prev,
            educations: prev.educations ? prev.educations.filter((_, i) => i !== index) : [],
        }));
    };

    // ✅ Fixed handleSubmit
    const handleSubmit = async () => {
        try {
            // Validate each section independently
            await personalSchema.validate(formData, { abortEarly: false });

            const experienceErrors: ErrorMessages[] = [];
            const educationErrors: ErrorMessages[] = [];
            let hasError = false;

            for (let i = 0; i < experiences.length; i++) {
                try {
                    await experienceSchema.validate(experiences[i], { abortEarly: false });
                } catch (err) {
                    if (err instanceof yup.ValidationError) {
                        hasError = true;
                        const fieldErrors: ErrorMessages = {};
                        err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                        experienceErrors[i] = fieldErrors;
                    }
                }
            }

            for (let i = 0; i < educations.length; i++) {
                try {
                    await educationSchema.validate(educations[i], { abortEarly: false });
                } catch (err) {
                    if (err instanceof yup.ValidationError) {
                        hasError = true;
                        const fieldErrors: ErrorMessages = {};
                        err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                        educationErrors[i] = fieldErrors;
                    }
                }
            }

            if (hasError) {
                setErrors((prev) => ({
                    ...prev,
                    experiences: experienceErrors,
                    educations: educationErrors,
                }));
                return;
            }

            alert("Form submitted successfully!");
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const fieldErrors: ErrorMessages = {};
                err.inner.forEach((e) => e.path && (fieldErrors[e.path] = e.message));
                setErrors((prev) => ({ ...prev, personal: fieldErrors }));
            }
        }
    };

    return (
        <>
            <div className="mb-8">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/user/resume")}
                    color="text-muted-foreground"
                    bg="bg-white"
                    icon={<ArrowLeft className="w-4 h-4" />}
                    iconPosition="left"
                    className="bg-white rounded-3xl border border-[rgba(255,255,255,1)] transition-transform hover:text-foreground hover:-translate-y-[1px]"
                >
                    Back
                </Button>
            </div>

            <Card hoverable={false} className="shadow-none w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full mx-auto py-4 sm:py-6"
                >
                    <h2 className="text-2xl font-semibold mb-2">Resume Information</h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        We’ve extracted information from your resume. Please review and make any necessary corrections.
                    </p>

                    {/* Personal Section */}
                    <Card className="w-full shadow-none mb-6" hoverable={false}>
                        <h3 className="text-lg font-semibold mb-4">Personal</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {["firstName", "lastName", "email", "phone", "location"].map((field) => (
                                <div key={field}>
                                    <Input
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        name={field}
                                        value={(formData as never)[field]}
                                        onChange={handleChange}
                                        placeholder={field === "email" ? "example@gmail.com" : field}
                                        className="w-full"
                                    />
                                    {errors.personal?.[field] && (
                                        <p className="text-red-500 text-xs mt-1">{errors.personal[field]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <label className="text-sm font-medium mb-1 block">Professional Summary</label>
                            <textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                placeholder="Experienced software developer with 5+ years of experience..."
                                className="w-full border rounded-lg p-3 text-sm bg-background focus:ring-2 focus:ring-primary"
                                rows={4}
                            />
                            {errors.personal?.summary && (
                                <p className="text-red-500 text-xs mt-1">{errors.personal.summary}</p>
                            )}
                        </div>
                    </Card>

                    {/* Experience Section */}
                    <Card className="mt-6 shadow-none w-full" hoverable={false}>
                        <AnimatePresence>
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative py-4 bg-muted/20 mb-4 shadow-none w-full">
                                        <h3 className="text-lg font-semibold mb-4">Experience</h3>
                                        {index > 0 && (
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                            {(["jobTitle", "company", "startDate", "endDate"] as (keyof Experience)[]).map(
                                                (field) => (
                                                    <div key={field}>
                                                        <Input
                                                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                            value={exp[field]}
                                                            onChange={(e) =>
                                                                handleExperienceChange(index, field, e.target.value)
                                                            }
                                                            placeholder={field}
                                                            className="w-full"
                                                        />
                                                        {errors.experiences?.[index]?.[field] && (
                                                            <p className="text-red-500 text-xs mt-1">
                                                                {errors.experiences[index][field]}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <label className="text-sm font-medium mb-1 block">Description</label>
                                            <textarea
                                                value={exp.description}
                                                onChange={(e) =>
                                                    handleExperienceChange(index, "description", e.target.value)
                                                }
                                                placeholder="Led development of company product using React..."
                                                className="w-full border rounded-lg p-3 text-sm bg-background focus:ring-2 focus:ring-primary"
                                                rows={3}
                                            />
                                            {errors.experiences?.[index]?.description && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.experiences[index].description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <Button
                            variant="outline"
                            className="w-full text-primary-500 my-4"
                            icon={<Plus />}
                            iconPosition="left"
                            onClick={addExperience}
                        >
                            Add Another Experience
                        </Button>
                    </Card>

                    {/* Education Section */}
                    <Card className="mt-6 shadow-none w-full" hoverable={false}>
                        <AnimatePresence>
                            {educations.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative py-4 bg-muted/20 mb-4 shadow-none w-full">
                                        <h3 className="text-lg font-semibold mb-4">Education</h3>
                                        {index > 0 && (
                                            <button
                                                onClick={() => removeEducation(index)}
                                                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                            {(
                                                [
                                                    "degree",
                                                    "course",
                                                    "institution",
                                                    "graduationDate",
                                                    "location",
                                                ] as (keyof Education)[]
                                            ).map((field) => (
                                                <div key={field}>
                                                    <Input
                                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                                        value={edu[field]}
                                                        onChange={(e) =>
                                                            handleEducationChange(index, field, e.target.value)
                                                        }
                                                        placeholder={field}
                                                        className="w-full"
                                                    />
                                                    {errors.educations?.[index]?.[field] && (
                                                        <p className="text-red-500 text-xs mt-1">
                                                            {errors.educations[index][field]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <Button
                            variant="outline"
                            className="w-full text-primary-500 my-4"
                            icon={<Plus />}
                            iconPosition="left"
                            onClick={addEducation}
                        >
                            Add Another Education
                        </Button>
                    </Card>

                    <div className="flex justify-end mt-8">
                        <Button
                            onClick={handleSubmit}
                            className="text-white bg-primary-600 hover:bg-primary-700"
                            icon={<FilePlayIcon />}
                            iconPosition="left"
                        >
                            Save and Continue
                        </Button>
                    </div>
                </motion.div>
            </Card>
        </>
    );
}
