// src/components/BlogData.js
import BlogPlaceholder from "../assets/BlogPlaceholder.png";

const blogPosts = [
  {
    id: 1,
    title: "Unlocking Your Brain's Full Potential",
    image: BlogPlaceholder,
    excerpt: "Discover the secrets to maximizing your brain's capabilities...",
    description:
      "In this comprehensive guide, we delve into the latest neuroscience research to uncover strategies for enhancing cognitive functions. Learn how proper nutrition, exercise, and mental exercises can significantly boost your brain performance.",
    date: "2024-04-10",
    metaData: {
      category: "Mental Health & Mindfulness",
      author: "10X Formulas",
    },
    tags: ["Brain Health", "Cognitive Enhancement", "Neuroscience", "Self Improvement"],
  },
  {
    id: 2,
    title: "The Importance of Nutrition in Daily Performance",
    image: BlogPlaceholder,
    excerpt: "Explore how balanced nutrition fuels your day-to-day activities...",
    description:
      "Nutrition plays a pivotal role in maintaining energy levels and cognitive functions. This article examines the essential nutrients required for optimal brain health and how they contribute to sustained daily performance.",
    date: "2024-03-25",
    metaData: {
      category: "Fitness & Nutrition",
      author: "10X Formulas",
    },
    tags: ["Nutrition", "Energy Levels", "Brain Health", "Healthy Eating"],
  },
  {
    id: 3,
    title: "10X Formulas: Revolutionizing Brain Nourishment",
    image: BlogPlaceholder,
    excerpt: "Learn how 10X Formulas is changing the game in brain nutrition...",
    description:
      "10X Formulas has pioneered a unique approach to brain nourishment, blending scientific research with practical applications. Discover the innovative formulations that set us apart in the health supplements industry.",
    date: "2024-03-10",
    metaData: {
      category: "Supplements & Science",
      author: "10X Formulas",
    },
    tags: ["Supplements", "Brain Nutrition", "Health Innovation", "Fitness"],
  },
  {
    id: 4,
    title: "Mindfulness and Its Effects on Cognitive Health",
    image: BlogPlaceholder,
    excerpt: "Understand the profound impact of mindfulness practices on your brain...",
    description:
      "Mindfulness meditation has been linked to numerous cognitive benefits, including improved focus, memory, and emotional regulation. This article explores the science behind mindfulness and practical tips to incorporate it into your daily routine.",
    date: "2024-02-28",
    metaData: {
      category: "Mental Health & Mindfulness",
      author: "10X Formulas",
    },
    tags: ["Mindfulness", "Cognitive Health", "Meditation", "Emotional Regulation"],
  },
  {
    id: 5,
    title: "The Role of Exercise in Enhancing Brain Function",
    image: BlogPlaceholder,
    excerpt: "Discover how physical activity boosts your brain's performance...",
    description:
      "Regular exercise is not only beneficial for physical health but also crucial for cognitive function. Learn about the mechanisms through which exercise enhances memory, learning, and overall brain health.",
    date: "2024-02-15",
    metaData: {
      category: "Fitness & Nutrition",
      author: "10X Formulas",
    },
    tags: ["Exercise", "Brain Function", "Memory Improvement", "Physical Health"],
  },
  {
    id: 6,
    title: "Stress Management Techniques for a Healthier Mind",
    image: BlogPlaceholder,
    excerpt: "Effective strategies to manage stress and maintain mental well-being...",
    description:
      "Chronic stress can have detrimental effects on brain health. This article outlines various stress management techniques, including breathing exercises, time management, and lifestyle changes, to help you maintain a balanced and healthy mind.",
    date: "2024-02-01",
    metaData: {
      category: "Sleep & Stress Management",
      author: "10X Formulas",
    },
    tags: ["Stress Management", "Mental Well-being", "Breathing Exercises", "Lifestyle Changes"],
  },
  {
    id: 7,
    title: "The Science Behind Energy Supplements",
    image: BlogPlaceholder,
    excerpt: "Uncover the scientific principles that make energy supplements effective...",
    description:
      "Energy supplements have become increasingly popular for boosting daily performance. This article examines the scientific research supporting the efficacy of various ingredients commonly found in energy supplements.",
    date: "2024-01-20",
    metaData: {
      category: "Supplements & Science",
      author: "10X Formulas",
    },
    tags: ["Energy Supplements", "Health Science", "Daily Performance", "Supplement Ingredients"],
  },
  {
    id: 8,
    title: "Building a Morning Routine for Success",
    image: BlogPlaceholder,
    excerpt: "Establish a morning routine that sets the tone for a productive day...",
    description:
      "A well-structured morning routine can significantly enhance your productivity and mental clarity. Explore strategies to create a morning routine that aligns with your personal and professional goals.",
    date: "2024-01-05",
    metaData: {
      category: "Productivity & Lifestyle",
      author: "10X Formulas",
    },
    tags: ["Morning Routine", "Productivity", "Mental Clarity", "Goal Setting"],
  },
  {
    id: 9,
    title: "Sleep and Brain Health: What You Need to Know",
    image: BlogPlaceholder,
    excerpt: "Understand the critical connection between sleep and cognitive function...",
    description:
      "Quality sleep is essential for maintaining optimal brain health. This article discusses how sleep affects memory consolidation, emotional regulation, and overall cognitive performance, along with tips for improving sleep quality.",
    date: "2023-12-20",
    metaData: {
      category: "Sleep & Stress Management",
      author: "10X Formulas",
    },
    tags: ["Sleep Quality", "Brain Health", "Memory Consolidation", "Cognitive Performance"],
  },
  // Duplicate Posts (IDs 10-18) with Unique Tags and Standardized Categories
  {
    id: 10,
    title: "Unlocking Your Brain's Full Potential",
    image: BlogPlaceholder,
    excerpt: "Discover the secrets to maximizing your brain's capabilities...",
    description:
      "In this comprehensive guide, we delve into the latest neuroscience research to uncover strategies for enhancing cognitive functions. Learn how proper nutrition, exercise, and mental exercises can significantly boost your brain performance.",
    date: "2024-04-10",
    metaData: {
      category: "Mental Health & Mindfulness",
      author: "10X Formulas",
    },
    tags: ["Brain Optimization", "Cognitive Strategies", "Neuroscience", "Health Enhancement"],
  },
  {
    id: 11,
    title: "The Importance of Nutrition in Daily Performance",
    image: BlogPlaceholder,
    excerpt: "Explore how balanced nutrition fuels your day-to-day activities...",
    description:
      "Nutrition plays a pivotal role in maintaining energy levels and cognitive functions. This article examines the essential nutrients required for optimal brain health and how they contribute to sustained daily performance.",
    date: "2024-03-25",
    metaData: {
      category: "Fitness & Nutrition",
      author: "10X Formulas",
    },
    tags: ["Balanced Nutrition", "Energy Boost", "Brain Health", "Daily Performance"],
  },
  {
    id: 12,
    title: "10X Formulas: Revolutionizing Brain Nourishment",
    image: BlogPlaceholder,
    excerpt: "Learn how 10X Formulas is changing the game in brain nutrition...",
    description:
      "10X Formulas has pioneered a unique approach to brain nourishment, blending scientific research with practical applications. Discover the innovative formulations that set us apart in the health supplements industry.",
    date: "2024-03-10",
    metaData: {
      category: "Supplements & Science",
      author: "10X Formulas",
    },
    tags: ["Innovative Supplements", "Brain Nourishment", "Health Supplements", "Scientific Research"],
  },
  {
    id: 13,
    title: "Mindfulness and Its Effects on Cognitive Health",
    image: BlogPlaceholder,
    excerpt: "Understand the profound impact of mindfulness practices on your brain...",
    description:
      "Mindfulness meditation has been linked to numerous cognitive benefits, including improved focus, memory, and emotional regulation. This article explores the science behind mindfulness and practical tips to incorporate it into your daily routine.",
    date: "2024-02-28",
    metaData: {
      category: "Mental Health & Mindfulness",
      author: "10X Formulas",
    },
    tags: ["Mindfulness Practices", "Cognitive Benefits", "Meditation Techniques", "Emotional Health"],
  },
  {
    id: 14,
    title: "The Role of Exercise in Enhancing Brain Function",
    image: BlogPlaceholder,
    excerpt: "Discover how physical activity boosts your brain's performance...",
    description:
      "Regular exercise is not only beneficial for physical health but also crucial for cognitive function. Learn about the mechanisms through which exercise enhances memory, learning, and overall brain health.",
    date: "2024-02-15",
    metaData: {
      category: "Fitness & Nutrition",
      author: "10X Formulas",
    },
    tags: ["Physical Activity", "Cognitive Function", "Memory Enhancement", "Brain Health"],
  },
  {
    id: 15,
    title: "Stress Management Techniques for a Healthier Mind",
    image: BlogPlaceholder,
    excerpt: "Effective strategies to manage stress and maintain mental well-being...",
    description:
      "Chronic stress can have detrimental effects on brain health. This article outlines various stress management techniques, including breathing exercises, time management, and lifestyle changes, to help you maintain a balanced and healthy mind.",
    date: "2024-02-01",
    metaData: {
      category: "Sleep & Stress Management",
      author: "10X Formulas",
    },
    tags: ["Stress Relief", "Mental Well-being", "Breathing Techniques", "Lifestyle Management"],
  },
  {
    id: 16,
    title: "The Science Behind Energy Supplements",
    image: BlogPlaceholder,
    excerpt: "Uncover the scientific principles that make energy supplements effective...",
    description:
      "Energy supplements have become increasingly popular for boosting daily performance. This article examines the scientific research supporting the efficacy of various ingredients commonly found in energy supplements.",
    date: "2024-01-20",
    metaData: {
      category: "Supplements & Science",
      author: "10X Formulas",
    },
    tags: ["Energy Science", "Supplement Efficacy", "Performance Boosters", "Health Supplements"],
  },
  {
    id: 17,
    title: "Building a Morning Routine for Success",
    image: BlogPlaceholder,
    excerpt: "Establish a morning routine that sets the tone for a productive day...",
    description:
      "A well-structured morning routine can significantly enhance your productivity and mental clarity. Explore strategies to create a morning routine that aligns with your personal and professional goals.",
    date: "2024-01-05",
    metaData: {
      category: "Productivity & Lifestyle",
      author: "10X Formulas",
    },
    tags: ["Morning Habits", "Productivity Tips", "Mental Clarity", "Goal Achievement"],
  },
  {
    id: 18,
    title: "Sleep and Brain Health: What You Need to Know",
    image: BlogPlaceholder,
    excerpt: "Understand the critical connection between sleep and cognitive function...",
    description:
      "Quality sleep is essential for maintaining optimal brain health. This article discusses how sleep affects memory consolidation, emotional regulation, and overall cognitive performance, along with tips for improving sleep quality.",
    date: "2023-12-20",
    metaData: {
      category: "Sleep & Stress Management",
      author: "10X Formulas",
    },
    tags: ["Sleep Hygiene", "Cognitive Performance", "Memory Consolidation", "Emotional Regulation"],
  },
];

export default blogPosts;
