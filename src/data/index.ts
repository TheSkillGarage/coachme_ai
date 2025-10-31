import  type { Job, Notification } from "../types";

export const mockJobs: Job[] = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      logo: "💼",
      type: "Full-time",
      location: "San Francisco, CA",
      workType: "Remote",
      postedTime: "2 days ago",
      salary: "$120,000 - $150,000",
      description: "We're looking for a Senior React Developer to join our team. You'll be responsible for developing and implementing user interface components using React.js concepts and workflows.",
      skills: ["React", "JavaScript", "TypeScript", "Redux", "CSS", "HTML", "Webpack"],
      fullDescription: `
  About the Job
  We are seeking a Senior React Developer to join our product development team. In this role, you will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.
  
  Responsibilities
  - Develop new user-facing features using React.js
  - Build reusable components and front-end libraries for future use
  - Translate designs and wireframes into high-quality code
  - Optimize components for maximum performance across a vast array of web-capable devices and browsers
  - Coordinate with various teams working on distinct layers
  
  Requirements
  - 5+ years of experience with front-end development
  - 3+ years of experience with React.js
  - Strong proficiency in JavaScript
  - Experience with Redux or Flux
  - Familiarity with modern build pipelines and tools
  - Competitive salary and flexible work schedule
  
  Benefits
  - Health, dental, and vision insurance
  - 401(k) with company match
  - Remote work options
  `,
      companyDescription: `TechCorp Inc. is a leading technology company specializing in innovative software solutions. Founded in 2010, we've grown to over 500 employees across 5 global offices. Our mission is to create cutting-edge technology that enhances everyday life through digital innovation.`,
      similarJobs: [2, 5, 3], // IDs of similar jobs
      experienceLevel: "Senior Level",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      logo: "🎨",
      type: "Part-time",
      location: "New York, NY",
      workType: "Remote",
      postedTime: "4 days ago",
      salary: "$90,000 - $110,000",
      description: "Design Studio is seeking a talented UX Designer to create amazing user experiences. The ideal candidate should have a strong portfolio.",
      skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"],
      fullDescription: "Full job description for UX Designer with details about responsibilities and requirements...",
      companyDescription: "Design Studio is a creative agency focused on delivering exceptional user experiences for digital products.",
      similarJobs: [1, 4], // IDs of similar jobs
      experienceLevel: "Mid Level",
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "ServerStack",
      logo: "⚙️",
      type: "Contract",
      location: "Austin, TX",
      workType: "Onsite",
      postedTime: "6 days ago",
      salary: "$150,000 - $200,000",
      description: "Join our backend team to develop scalable and efficient server-side applications. Experience with Node.js, Python or Java required.",
      skills: ["Node.js", "Python", "Java", "AWS", "Docker", "SQL"],
      fullDescription: "Full job description for Backend Engineer with details about backend development and system architecture...",
      companyDescription: "ServerStack provides robust backend solutions for enterprise applications and scalable systems.",
      similarJobs: [1, 5], // IDs of similar jobs
      experienceLevel: "Mid Level",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "ProductLab",
      logo: "📊",
      type: "Part-time",
      location: "Seattle, WA",
      workType: "Remote",
      postedTime: "6 days ago",
      salary: "$115,000 - $140,000",
      description: "Lead product development from concept to launch. You'll work with cross-functional teams to define product strategy and roadmap.",
      skills: ["Product Management", "Agile", "Leadership", "Market Research", "Roadmapping"],
      fullDescription: "Full job description for Product Manager with details about product strategy and team leadership...",
      companyDescription: "ProductLab helps companies build successful products through innovative product management practices.",
      similarJobs: [2, 1], // IDs of similar jobs
      experienceLevel: "Mid Level",
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "CloudTech",
      logo: "☁️",
      type: "Internship",
      location: "Boston, MA",
      workType: "Remote",
      postedTime: "7 days ago",
      salary: "$125,000 - $155,000",
      description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for designing and implementing solutions that help our customers succeed.",
      skills: ["HTML", "CSS", "JavaScript", "React", "Vue", "Responsive Design"],
      fullDescription: "Full job description for Frontend Developer with details about frontend technologies and project work...",
      companyDescription: "CloudTech specializes in cloud-based solutions and modern web applications for various industries.",
      similarJobs: [1, 3], // IDs of similar jobs
      experienceLevel: "Entry Level",
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "WebSolutions Inc.",
      logo: "🌐",
      type: "Full-time",
      location: "Chicago, IL",
      workType: "Hybrid",
      postedTime: "1 day ago",
      salary: "$130,000 - $160,000",
      description: "Join our dynamic team as a Full Stack Developer working on both frontend and backend technologies.",
      skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
      fullDescription: "Full job description for Full Stack Developer...",
      companyDescription: "WebSolutions Inc. builds comprehensive web applications for clients worldwide.",
      similarJobs: [1, 3, 5], // IDs of similar jobs
      experienceLevel: "Mid Level",
    },
    {
      id: 7,
      title: "DevOps Engineer",
      company: "InfraTech",
      logo: "🔧",
      type: "Full-time",
      location: "Denver, CO",
      workType: "Remote",
      postedTime: "3 days ago",
      salary: "$140,000 - $170,000",
      description: "Looking for a DevOps Engineer to streamline our deployment processes and improve system reliability.",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
      fullDescription: "Full job description for DevOps Engineer...",
      companyDescription: "InfraTech provides infrastructure solutions and DevOps services for tech companies.",
      similarJobs: [3, 6], // IDs of similar jobs
      experienceLevel: "Senior Level",
    },
    {
        id: 8,
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        logo: "💼",
        type: "Full-time",
        location: "San Francisco, CA",
        workType: "Remote",
        postedTime: "2 days ago",
        salary: "$120,000 - $150,000",
        description: "We're looking for a Senior React Developer to join our team. You'll be responsible for developing and implementing user interface components using React.js concepts and workflows.",
        skills: ["React", "JavaScript", "TypeScript", "Redux", "CSS", "HTML", "Webpack"],
        fullDescription: `
    About the Job
    We are seeking a Senior React Developer to join our product development team. In this role, you will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.
    
    Responsibilities
    - Develop new user-facing features using React.js
    - Build reusable components and front-end libraries for future use
    - Translate designs and wireframes into high-quality code
    - Optimize components for maximum performance across a vast array of web-capable devices and browsers
    - Coordinate with various teams working on distinct layers
    
    Requirements
    - 5+ years of experience with front-end development
    - 3+ years of experience with React.js
    - Strong proficiency in JavaScript
    - Experience with Redux or Flux
    - Familiarity with modern build pipelines and tools
    - Competitive salary and flexible work schedule
    
    Benefits
    - Health, dental, and vision insurance
    - 401(k) with company match
    - Remote work options
    `,
        companyDescription: `TechCorp Inc. is a leading technology company specializing in innovative software solutions. Founded in 2010, we've grown to over 500 employees across 5 global offices. Our mission is to create cutting-edge technology that enhances everyday life through digital innovation.`,
        similarJobs: [2, 5, 3], // IDs of similar jobs
        experienceLevel: "Senior Level",
      },
      {
        id: 9,
        title: "UX Designer",
        company: "Design Studio",
        logo: "🎨",
        type: "Part-time",
        location: "New York, NY",
        workType: "Remote",
        postedTime: "4 days ago",
        salary: "$90,000 - $110,000",
        description: "Design Studio is seeking a talented UX Designer to create amazing user experiences. The ideal candidate should have a strong portfolio.",
        skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"],
        fullDescription: "Full job description for UX Designer with details about responsibilities and requirements...",
        companyDescription: "Design Studio is a creative agency focused on delivering exceptional user experiences for digital products.",
        similarJobs: [1, 4], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 10,
        title: "Backend Engineer",
        company: "ServerStack",
        logo: "⚙️",
        type: "Contract",
        location: "Austin, TX",
        workType: "Onsite",
        postedTime: "6 days ago",
        salary: "$150,000 - $200,000",
        description: "Join our backend team to develop scalable and efficient server-side applications. Experience with Node.js, Python or Java required.",
        skills: ["Node.js", "Python", "Java", "AWS", "Docker", "SQL"],
        fullDescription: "Full job description for Backend Engineer with details about backend development and system architecture...",
        companyDescription: "ServerStack provides robust backend solutions for enterprise applications and scalable systems.",
        similarJobs: [1, 5], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 11,
        title: "Product Manager",
        company: "ProductLab",
        logo: "📊",
        type: "Part-time",
        location: "Seattle, WA",
        workType: "Remote",
        postedTime: "6 days ago",
        salary: "$115,000 - $140,000",
        description: "Lead product development from concept to launch. You'll work with cross-functional teams to define product strategy and roadmap.",
        skills: ["Product Management", "Agile", "Leadership", "Market Research", "Roadmapping"],
        fullDescription: "Full job description for Product Manager with details about product strategy and team leadership...",
        companyDescription: "ProductLab helps companies build successful products through innovative product management practices.",
        similarJobs: [2, 1], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 12,
        title: "Frontend Developer",
        company: "CloudTech",
        logo: "☁️",
        type: "Internship",
        location: "Boston, MA",
        workType: "Remote",
        postedTime: "7 days ago",
        salary: "$125,000 - $155,000",
        description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for designing and implementing solutions that help our customers succeed.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Vue", "Responsive Design"],
        fullDescription: "Full job description for Frontend Developer with details about frontend technologies and project work...",
        companyDescription: "CloudTech specializes in cloud-based solutions and modern web applications for various industries.",
        similarJobs: [1, 3], // IDs of similar jobs
        experienceLevel: "Entry Level",
      },
      {
        id: 13,
        title: "Full Stack Developer",
        company: "WebSolutions Inc.",
        logo: "🌐",
        type: "Full-time",
        location: "Chicago, IL",
        workType: "Hybrid",
        postedTime: "1 day ago",
        salary: "$130,000 - $160,000",
        description: "Join our dynamic team as a Full Stack Developer working on both frontend and backend technologies.",
        skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
        fullDescription: "Full job description for Full Stack Developer...",
        companyDescription: "WebSolutions Inc. builds comprehensive web applications for clients worldwide.",
        similarJobs: [1, 3, 5], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 14,
        title: "DevOps Engineer",
        company: "InfraTech",
        logo: "🔧",
        type: "Full-time",
        location: "Denver, CO",
        workType: "Remote",
        postedTime: "3 days ago",
        salary: "$140,000 - $170,000",
        description: "Looking for a DevOps Engineer to streamline our deployment processes and improve system reliability.",
        skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
        fullDescription: "Full job description for DevOps Engineer...",
        companyDescription: "InfraTech provides infrastructure solutions and DevOps services for tech companies.",
        similarJobs: [3, 6], // IDs of similar jobs
        experienceLevel: "Senior Level",
      },
      {
        id: 15,
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        logo: "💼",
        type: "Full-time",
        location: "San Francisco, CA",
        workType: "Remote",
        postedTime: "2 days ago",
        salary: "$120,000 - $150,000",
        description: "We're looking for a Senior React Developer to join our team. You'll be responsible for developing and implementing user interface components using React.js concepts and workflows.",
        skills: ["React", "JavaScript", "TypeScript", "Redux", "CSS", "HTML", "Webpack"],
        fullDescription: `
    About the Job
    We are seeking a Senior React Developer to join our product development team. In this role, you will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.
    
    Responsibilities
    - Develop new user-facing features using React.js
    - Build reusable components and front-end libraries for future use
    - Translate designs and wireframes into high-quality code
    - Optimize components for maximum performance across a vast array of web-capable devices and browsers
    - Coordinate with various teams working on distinct layers
    
    Requirements
    - 5+ years of experience with front-end development
    - 3+ years of experience with React.js
    - Strong proficiency in JavaScript
    - Experience with Redux or Flux
    - Familiarity with modern build pipelines and tools
    - Competitive salary and flexible work schedule
    
    Benefits
    - Health, dental, and vision insurance
    - 401(k) with company match
    - Remote work options
    `,
        companyDescription: `TechCorp Inc. is a leading technology company specializing in innovative software solutions. Founded in 2010, we've grown to over 500 employees across 5 global offices. Our mission is to create cutting-edge technology that enhances everyday life through digital innovation.`,
        similarJobs: [2, 5, 3], // IDs of similar jobs
        experienceLevel: "Senior Level",
      },
      {
        id: 16,
        title: "UX Designer",
        company: "Design Studio",
        logo: "🎨",
        type: "Part-time",
        location: "New York, NY",
        workType: "Remote",
        postedTime: "4 days ago",
        salary: "$90,000 - $110,000",
        description: "Design Studio is seeking a talented UX Designer to create amazing user experiences. The ideal candidate should have a strong portfolio.",
        skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"],
        fullDescription: "Full job description for UX Designer with details about responsibilities and requirements...",
        companyDescription: "Design Studio is a creative agency focused on delivering exceptional user experiences for digital products.",
        similarJobs: [1, 4], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 17,
        title: "Backend Engineer",
        company: "ServerStack",
        logo: "⚙️",
        type: "Contract",
        location: "Austin, TX",
        workType: "Onsite",
        postedTime: "6 days ago",
        salary: "$150,000 - $200,000",
        description: "Join our backend team to develop scalable and efficient server-side applications. Experience with Node.js, Python or Java required.",
        skills: ["Node.js", "Python", "Java", "AWS", "Docker", "SQL"],
        fullDescription: "Full job description for Backend Engineer with details about backend development and system architecture...",
        companyDescription: "ServerStack provides robust backend solutions for enterprise applications and scalable systems.",
        similarJobs: [1, 5], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 18,
        title: "Product Manager",
        company: "ProductLab",
        logo: "📊",
        type: "Part-time",
        location: "Seattle, WA",
        workType: "Remote",
        postedTime: "6 days ago",
        salary: "$115,000 - $140,000",
        description: "Lead product development from concept to launch. You'll work with cross-functional teams to define product strategy and roadmap.",
        skills: ["Product Management", "Agile", "Leadership", "Market Research", "Roadmapping"],
        fullDescription: "Full job description for Product Manager with details about product strategy and team leadership...",
        companyDescription: "ProductLab helps companies build successful products through innovative product management practices.",
        similarJobs: [2, 1], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 19,
        title: "Frontend Developer",
        company: "CloudTech",
        logo: "☁️",
        type: "Internship",
        location: "Boston, MA",
        workType: "Remote",
        postedTime: "7 days ago",
        salary: "$125,000 - $155,000",
        description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for designing and implementing solutions that help our customers succeed.",
        skills: ["HTML", "CSS", "JavaScript", "React", "Vue", "Responsive Design"],
        fullDescription: "Full job description for Frontend Developer with details about frontend technologies and project work...",
        companyDescription: "CloudTech specializes in cloud-based solutions and modern web applications for various industries.",
        similarJobs: [1, 3], // IDs of similar jobs
        experienceLevel: "Entry Level",
      },
      {
        id: 20,
        title: "Full Stack Developer",
        company: "WebSolutions Inc.",
        logo: "🌐",
        type: "Full-time",
        location: "Chicago, IL",
        workType: "Hybrid",
        postedTime: "1 day ago",
        salary: "$130,000 - $160,000",
        description: "Join our dynamic team as a Full Stack Developer working on both frontend and backend technologies.",
        skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
        fullDescription: "Full job description for Full Stack Developer...",
        companyDescription: "WebSolutions Inc. builds comprehensive web applications for clients worldwide.",
        similarJobs: [1, 3, 5], // IDs of similar jobs
        experienceLevel: "Mid Level",
      },
      {
        id: 21,
        title: "DevOps Engineer",
        company: "InfraTech",
        logo: "🔧",
        type: "Full-time",
        location: "Denver, CO",
        workType: "Remote",
        postedTime: "3 days ago",
        salary: "$140,000 - $170,000",
        description: "Looking for a DevOps Engineer to streamline our deployment processes and improve system reliability.",
        skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
        fullDescription: "Full job description for DevOps Engineer...",
        companyDescription: "InfraTech provides infrastructure solutions and DevOps services for tech companies.",
        similarJobs: [3, 6], // IDs of similar jobs
        experienceLevel: "Senior Level",
      },
      {
          id: 22,
          title: "Senior React Developer",
          company: "TechCorp Inc.",
          logo: "💼",
          type: "Full-time",
          location: "San Francisco, CA",
          workType: "Remote",
          postedTime: "2 days ago",
          salary: "$120,000 - $150,000",
          description: "We're looking for a Senior React Developer to join our team. You'll be responsible for developing and implementing user interface components using React.js concepts and workflows.",
          skills: ["React", "JavaScript", "TypeScript", "Redux", "CSS", "HTML", "Webpack"],
          fullDescription: `
      About the Job
      We are seeking a Senior React Developer to join our product development team. In this role, you will be responsible for developing and implementing user interface components using React.js concepts and workflows such as Redux, Flux, and Webpack.
      
      Responsibilities
      - Develop new user-facing features using React.js
      - Build reusable components and front-end libraries for future use
      - Translate designs and wireframes into high-quality code
      - Optimize components for maximum performance across a vast array of web-capable devices and browsers
      - Coordinate with various teams working on distinct layers
      
      Requirements
      - 5+ years of experience with front-end development
      - 3+ years of experience with React.js
      - Strong proficiency in JavaScript
      - Experience with Redux or Flux
      - Familiarity with modern build pipelines and tools
      - Competitive salary and flexible work schedule
      
      Benefits
      - Health, dental, and vision insurance
      - 401(k) with company match
      - Remote work options
      `,
          companyDescription: `TechCorp Inc. is a leading technology company specializing in innovative software solutions. Founded in 2010, we've grown to over 500 employees across 5 global offices. Our mission is to create cutting-edge technology that enhances everyday life through digital innovation.`,
          similarJobs: [2, 5, 3], // IDs of similar jobs
          experienceLevel: "Senior Level",
        },
        {
          id: 23,
          title: "UX Designer",
          company: "Design Studio",
          logo: "🎨",
          type: "Part-time",
          location: "New York, NY",
          workType: "Remote",
          postedTime: "4 days ago",
          salary: "$90,000 - $110,000",
          description: "Design Studio is seeking a talented UX Designer to create amazing user experiences. The ideal candidate should have a strong portfolio.",
          skills: ["Figma", "UI/UX", "Prototyping", "User Research", "Wireframing"],
          fullDescription: "Full job description for UX Designer with details about responsibilities and requirements...",
          companyDescription: "Design Studio is a creative agency focused on delivering exceptional user experiences for digital products.",
          similarJobs: [1, 4], // IDs of similar jobs
          experienceLevel: "Mid Level",
        },
        {
          id: 24,
          title: "Backend Engineer",
          company: "ServerStack",
          logo: "⚙️",
          type: "Contract",
          location: "Austin, TX",
          workType: "Onsite",
          postedTime: "6 days ago",
          salary: "$150,000 - $200,000",
          description: "Join our backend team to develop scalable and efficient server-side applications. Experience with Node.js, Python or Java required.",
          skills: ["Node.js", "Python", "Java", "AWS", "Docker", "SQL"],
          fullDescription: "Full job description for Backend Engineer with details about backend development and system architecture...",
          companyDescription: "ServerStack provides robust backend solutions for enterprise applications and scalable systems.",
          similarJobs: [1, 5], // IDs of similar jobs
          experienceLevel: "Mid Level",
        },
        {
          id: 25,
          title: "Product Manager",
          company: "ProductLab",
          logo: "📊",
          type: "Part-time",
          location: "Seattle, WA",
          workType: "Remote",
          postedTime: "6 days ago",
          salary: "$115,000 - $140,000",
          description: "Lead product development from concept to launch. You'll work with cross-functional teams to define product strategy and roadmap.",
          skills: ["Product Management", "Agile", "Leadership", "Market Research", "Roadmapping"],
          fullDescription: "Full job description for Product Manager with details about product strategy and team leadership...",
          companyDescription: "ProductLab helps companies build successful products through innovative product management practices.",
          similarJobs: [2, 1], // IDs of similar jobs
          experienceLevel: "Mid Level",
        },
        {
          id: 26,
          title: "Frontend Developer",
          company: "CloudTech",
          logo: "☁️",
          type: "Internship",
          location: "Boston, MA",
          workType: "Remote",
          postedTime: "7 days ago",
          salary: "$125,000 - $155,000",
          description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for designing and implementing solutions that help our customers succeed.",
          skills: ["HTML", "CSS", "JavaScript", "React", "Vue", "Responsive Design"],
          fullDescription: "Full job description for Frontend Developer with details about frontend technologies and project work...",
          companyDescription: "CloudTech specializes in cloud-based solutions and modern web applications for various industries.",
          similarJobs: [1, 3], // IDs of similar jobs
          experienceLevel: "Entry Level",
        },
        {
          id: 27,
          title: "Full Stack Developer",
          company: "WebSolutions Inc.",
          logo: "🌐",
          type: "Full-time",
          location: "Chicago, IL",
          workType: "Hybrid",
          postedTime: "1 day ago",
          salary: "$130,000 - $160,000",
          description: "Join our dynamic team as a Full Stack Developer working on both frontend and backend technologies.",
          skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
          fullDescription: "Full job description for Full Stack Developer...",
          companyDescription: "WebSolutions Inc. builds comprehensive web applications for clients worldwide.",
          similarJobs: [1, 3, 5], // IDs of similar jobs
          experienceLevel: "Mid Level",
        },
        {
          id: 28,
          title: "DevOps Engineer",
          company: "InfraTech",
          logo: "🔧",
          type: "Full-time",
          location: "Denver, CO",
          workType: "Remote",
          postedTime: "3 days ago",
          salary: "$140,000 - $170,000",
          description: "Looking for a DevOps Engineer to streamline our deployment processes and improve system reliability.",
          skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
          fullDescription: "Full job description for DevOps Engineer...",
          companyDescription: "InfraTech provides infrastructure solutions and DevOps services for tech companies.",
          similarJobs: [3, 6], // IDs of similar jobs
          experienceLevel: "Senior Level",
        },
  ];

 export const activityItems: Notification[] = [
    {
        title: 'Interview Scheduled',
        description:
            'Your interview with TechCorp for Senior Developer position has been scheduled for tomorrow at 2:00 PM.',
        date: 'Monday, January 15, 2024',
        itemType: 'interview',
        itemDetails: {
            position: 'Senior React Developer',
            companyName: 'TechCorp Inc',
            location: 'San Francisco, CA',
            date: 'Monday, January 15, 2025 ',
            time: '11:30 AM',
        },
    },
    {
        title: 'Application Status Update',
        description:
            'Your application for Product Manager at Tech Trinity Studio has moved to the interview stage.',
        date: '2025-10-24T14:00:00Z',
        itemType: 'application',
        itemDetails: {
            position: 'Senior React Developer',
            companyName: 'TechCorp Inc',
            location: 'San Francisco, CA',
            date: '2025-10-20T14:00:00Z',
            time: '02:00 PM',
        },
    },
    {
        title: 'Application Status Update',
        description:
            'Your application for Product Manager at Tech Trinity Studio has moved to the interview stage.',
        date: 'Friday, October 10, 2025',
        itemType: 'profile',
        itemDetails: {
            position: 'Senior React Developer',
            companyName: 'TechCorp Inc',
            location: 'San Francisco, CA',
            date: 'Friday, October 10, 2025',
            time: '11:30 AM',
        },
    },
    
];