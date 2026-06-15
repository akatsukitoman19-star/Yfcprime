import { Trainer, Equipment, Plan, Transformation, Testimonial, ClassSchedule } from './types';

export const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Rahul Mehta',
    role: 'Strength Coach & Head Trainer',
    experience: '8 Years Experience',
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=75',
    specialties: ['Powerlifting', 'Hypertrophy Training', 'Injury Rehabilitation'],
    bio: 'Rahul is highly certified coach aiming to provide safe powerlifting methods and progressive overload structures for maximum performance.'
  },
  {
    id: 't2',
    name: 'Arjun Singh',
    role: 'Bodybuilding Expert',
    experience: '10 Years Experience',
    imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&q=75',
    specialties: ['Contest Prep', 'Lean Mass Gaining', 'Kettlebell Work'],
    bio: 'Arjun has coached over 200+ clients into life-changing physiques. He focuses on muscle targeting, mind-muscle connection, and high-intensity principles.'
  },
  {
    id: 't3',
    name: 'Karan Sharma',
    role: 'Fat Loss Specialist',
    experience: '6 Years Experience',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75',
    specialties: ['HIIT', 'Metabolic Conditioning', 'Calisthenics'],
    bio: 'Karan believes that fat loss starts in the mind. His high-energy HIIT bootcamps and strict dietary tracking guarantee visible results.'
  },
  {
    id: 't4',
    name: 'Vikram Patel',
    role: 'Personal Fitness Coach',
    experience: '5 Years Experience',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&q=75',
    specialties: ['Functional Mobility', 'Yoga & Stretching', 'Core Strengthening'],
    bio: 'Vikram focuses on long-term wellness, core stabilization, kinetic movement, and dynamic flexibility to build a resilient and agile body.'
  }
];

export const EQUIPMENT: Equipment[] = [
  {
    id: 'eq1',
    name: 'Pro Series Treadmills',
    category: 'Cardio',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=75',
    description: 'High-end dynamic shock absorption treadmill with simulated terrain runs and continuous heart-rate tracking.'
  },
  {
    id: 'eq2',
    name: 'Elliptical Cross Trainers',
    category: 'Cardio',
    imageUrl: 'https://images.unsplash.com/photo-1534438097545-a2c22c57f2ad?w=400&q=75',
    description: 'Low-impact cardiovascular trainers built to burn maximum calories while protecting your joints.'
  },
  {
    id: 'eq3',
    name: 'Integrated Smith Machine',
    category: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=75',
    description: 'Ultra-glide safety bars and robust frame lets you perform presses and squats with absolute control.'
  },
  {
    id: 'eq4',
    name: 'Power Squat Racks',
    category: 'Power',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=75',
    description: 'Solid heavy-gauge steel cages equipped with safety spotter arms, band pegs, and multi-grip pull-up bars.'
  },
  {
    id: 'eq5',
    name: 'Premium Bench Press Racks',
    category: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=75',
    description: 'Olympic benches with flat, incline, and decline angles, offering stable lifting bases for heavy-duty compound lifts.'
  },
  {
    id: 'eq6',
    name: 'Dual Column Cable Crossover',
    category: 'Strength',
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=75',
    description: 'Highly adjustable pulley tracks that support hundreds of isolative movements for chest, back, and arms.'
  },
  {
    id: 'eq7',
    name: 'Solid Rubber Dumbbell Area',
    category: 'Free Weights',
    imageUrl: 'https://images.pexels.com/photos/3916766/pexels-photo-3916766.jpeg',
    description: 'Ergonomic dumbbells spanning from 2.5 kg to 50 kg, alongside high-density impact-absorbent rubber flooring.'
  },
  {
    id: 'eq8',
    name: 'Functional Training Rig',
    category: 'Functional',
    imageUrl: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&q=75',
    description: 'A versatile combat playground with medicine balls, kettlebells, battle ropes, and climbing structures.'
  }
];

export const PLANS: Plan[] = [
  {
    id: 'p_basic',
    name: 'Basic Plan',
    tagline: 'Perfect for beginners starting their journey',
    price: 999,
    period: 'month',
    color: 'border-zinc-800',
    features: [
      'Gym Floor Access (No Limits)',
      'High-Tech Cardio Zone Access',
      'Free Weights Area Access',
      'Individual Lockers & Showers',
      'Group Classes (2 Sessions/week)',
      'Free Fitness Orientation Session'
    ]
  },
  {
    id: 'p_pro',
    name: 'Pro Athlete Plan',
    tagline: 'Best for dedicated lifters and athletes',
    price: 1799,
    period: 'month',
    color: 'border-zinc-700',
    features: [
      'Everything in Basic Plan',
      'Full Access to Elite Power & Squat Zones',
      'Unlimited High-Energy Group Classes',
      'Monthly Certified Nutrition Assessment',
      'InBody Composition & Progress Analysis',
      '1 Personal Training Session per month'
    ]
  },
  {
    id: 'p_elite',
    name: 'Elite Transformation',
    tagline: 'The complete premium life change blueprint',
    price: 2999,
    period: 'month',
    color: 'border-primary/50 bg-[#0d0000]',
    featured: true,
    features: [
      'Everything in Pro Plan',
      'Dedicated Personal Trainer (4 Sessions/week)',
      'Fully Customized Science-Backed Workout Program',
      'Weekly Personalized Nutrition & Macro Diet Plan',
      'Priority Equipment Booking & Lounge Access',
      'Passes for 2 Guests (Every Month)',
      '24/7 Priority Support/Feedback (via VIP WhatsApp Group)'
    ]
  }
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: 'tr1',
    title: 'Fat Loss Transformation',
    type: 'Weight Loss',
    beforeImg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=70',
    afterImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=70',
    beforeStats: '96 kg (32% Body Fat)',
    afterStats: '78 kg (14% Body Fat)',
    description: 'Rohan lost 18 kg of excess fat, built stellar cardiovascular stamina, and reversed his metabolic age.',
    duration: '4 Months'
  },
  {
    id: 'tr2',
    title: 'Lean Bulk Muscle Gaining',
    type: 'Muscle Gain',
    beforeImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=70',
    afterImg: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&q=70',
    beforeStats: '61 kg (Skinny Physique)',
    afterStats: '73 kg (Athletic Lean Mass)',
    description: 'Suresh pack on 12 kg of clean lean muscle. Focused strictly on progressive overload and heavy weight compound lifts.',
    duration: '6 Months'
  },
  {
    id: 'tr3',
    title: 'Strength and Power Gaining',
    type: 'Strength Focus',
    beforeImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&q=70',
    afterImg: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=300&q=70',
    beforeStats: '80kg Deadlift Max',
    afterStats: '160kg Deadlift Max (2x)',
    description: 'Amit gained structural strength under powerlifting training, doubling his squat and deadlift maxes while resolving lower back pain.',
    duration: '3 Months'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Priya Sharma',
    role: 'Wadiya Resident',
    text: 'The brand new premium facility here is on another level. The equipment is top tier and trainers genuinely track your progress daily! Best gym in Banswara, hands down.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&q=80',
    meta: 'Member since Jan 2024'
  },
  {
    id: 'test2',
    name: 'Rohit Mehta',
    role: 'Elite Member',
    text: 'I lost 15 kilograms in under 5 months. The Elite plan is worth every single rupee. My trainer Karan is an absolute professional who motivated me in every single lift.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    meta: 'Elite Coaching Program'
  },
  {
    id: 'test3',
    name: 'Anita Kumari',
    role: 'Business Owner',
    text: 'Incredible luxurious interiors, high-class atmosphere, and extremely clean and pristine hygiene. Highly recommended for girls looking for a safe and professional environment.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&q=80',
    meta: 'Pro Member'
  }
];

export const CLASSES: ClassSchedule[] = [
  { id: 'c1', className: 'Cardio Core Blast', time: '06:00 AM - 07:00 AM', trainer: 'Karan Sharma', day: 'Monday', intensity: 'High' },
  { id: 'c2', className: 'Zumba Fusion', time: '07:30 AM - 08:30 AM', trainer: 'Vikram Patel', day: 'Monday', intensity: 'Medium' },
  { id: 'c3', className: 'Heavy Duty Muscle Club', time: '06:00 PM - 07:00 PM', trainer: 'Arjun Singh', day: 'Tuesday', intensity: 'Extreme' },
  { id: 'c4', className: 'Power Squat Squad', time: '07:00 AM - 08:00 AM', trainer: 'Rahul Mehta', day: 'Wednesday', intensity: 'Extreme' },
  { id: 'c5', className: 'Calisthenics Focus', time: '06:30 PM - 07:30 PM', trainer: 'Karan Sharma', day: 'Thursday', intensity: 'High' },
  { id: 'c6', className: 'Mobility & Yin Yoga', time: '08:00 AM - 09:00 AM', trainer: 'Vikram Patel', day: 'Friday', intensity: 'Medium' },
  { id: 'c7', className: 'Full-Body Endurance Rig', time: '05:00 PM - 06:15 PM', trainer: 'Rahul Mehta', day: 'Saturday', intensity: 'Extreme' }
];

export interface GoalOutput {
  exercises: { name: string; sets: string; reps: string; tip: string }[];
  diet: { focus: string; protein: string; carbs: string; fats: string; mealSample: string }[];
}

export const FITNESS_PLAN_MATRIX: Record<string, GoalOutput> = {
  fat_loss: {
    exercises: [
      { name: 'Warm-up: Incline Treadmill Speed Walk', sets: '1', reps: '10 mins', tip: 'Keep gradient around 8-10% to engage hamstrings.' },
      { name: 'Kettlebell Goblet Squats', sets: '4', reps: '15 reps', tip: 'Engage core, keep dumbbells high, breathe out on ascent.' },
      { name: 'Lat Pulldowns (Wide Grip)', sets: '4', reps: '12-15 reps', tip: 'Control the upward stretch, squeeze back at bottom.' },
      { name: 'Dumbbell Walking Lunges', sets: '3', reps: '20 steps total', tip: 'Keep thoracic straight, focus force on front heel.' },
      { name: 'Metabolic Finisher: Dumbbell Thrusters', sets: '3', reps: '45 seconds work', tip: 'Maintain continuous speed and explode upward.' }
    ],
    diet: [
      { focus: 'Deficit Calories, High Protein, Medium Carbs', protein: '1.8g - 2.2g per kg body weight', carbs: 'Moderate (mainly complex whole oats/sweet potatoes)', fats: 'Healthy fats (almonds, whole eggs, olive oil)', mealSample: 'Grilled chicken salad or high protein paneer stew with steamed broccoli and small cup of brown rice.' }
    ]
  },
  muscle_gain: {
    exercises: [
      { name: 'Smith Machine Flat Bench Press', sets: '4', reps: '8-10 reps', tip: 'Eccentric deceleration, control down in 3 seconds.' },
      { name: 'High-Bar Barbell Squats', sets: '4', reps: '6-8 reps', tip: 'Drop to parallel depth, explode out of bottom stance.' },
      { name: 'Heavy Dumbbell Rows', sets: '3', reps: '8-10 reps per side', tip: 'Pull elbow towards hip pocket, hold peaks for 1 second.' },
      { name: 'Overhead Barbell Shoulder Press', sets: '4', reps: '8 reps', tip: 'Breathe out at sticking point, squeeze traps.' },
      { name: 'Isolative Bicep & Tricep Supersets', sets: '3', reps: '12-15 reps', tip: 'Slow squeeze for maximum metabolic stress pump.' }
    ],
    diet: [
      { focus: 'Caloric Surplus, High Carbs, High Protein', protein: '2.0g - 2.4g per kg body weight', carbs: 'High (sweet potatoes, whole grains, basmati rice, bananas)', fats: 'Regular intake (peanut butter, coconut oil, avocados)', mealSample: 'Lean beef or soya chunks curry cooked in light oil, 2 bowls basmati rice, plate of mixed greens + whey protein shake.' }
    ]
  },
  strength_power: {
    exercises: [
      { name: 'Olympic Barbell Clean & Press', sets: '5', reps: '3-5 reps', tip: 'Focused on absolute explosive power and speed.' },
      { name: 'Conventional Deadlift (Progressive)', sets: '5', reps: '3 reps (80-90% 1RM)', tip: 'Brace core hard, pack lats, push floor away.' },
      { name: 'Incline Bench Press', sets: '4', reps: '5 reps', tip: 'Stable shoulder blades, solid foot placement.' },
      { name: 'Barbell Romanian Deadlifts', sets: '3', reps: '6-8 reps', tip: 'Stretching hamstrings, hinge strictly at hips.' },
      { name: 'Weighted Pull-ups', sets: '3', reps: '5 reps max', tip: 'Squeeze shoulder blades, add weight to waist belt slowly.' }
    ],
    diet: [
      { focus: 'Performance Calories, Moderate Fats, High Electrolytes', protein: '1.8g - 2.2g per kg body weight', carbs: 'High quick energy (rice, whole wheat rotis, bananas, dates)', fats: 'Moderate performance fats', mealSample: 'Boiled eggs, oatmeal with peanut butter & raisins, baked potato with chicken breast, hydration drinks beforehand.' }
    ]
  },
  general_fitness: {
    exercises: [
      { name: 'Assisted Bodyweight Pullups', sets: '3', reps: '10-12 reps', tip: 'Full range of motion, extend arms fully.' },
      { name: 'Leg Press Machine', sets: '3', reps: '12-15 reps', tip: 'Do not lock knees fully at top, control down.' },
      { name: 'Cable Face Pulls', sets: '3', reps: '15 reps', tip: 'Excellent for posture, pull towards forehead, squeeze rear delts.' },
      { name: 'Core Planks & Hollow Holds', sets: '3', reps: '45-60 seconds', tip: 'Squeeze glutes and abdominals together.' },
      { name: 'Cardio: Elliptical Cross Trainer', sets: '1', reps: '15 mins interval', tip: '30 seconds fast sprint, 60 seconds moderate recovery.' }
    ],
    diet: [
      { focus: 'Isometric Balance, Nutrient Density, Antioxidants', protein: '1.3g - 1.6g per kg body weight', carbs: 'Balanced complex carbs and high fiber veggies', fats: 'Omega-3 rich fish oils, flaxseeds, walnuts', mealSample: 'Paneer or egg bhurji cooked with bell peppers, spinach, whole wheat multigrain chapatis, fresh apples & green tea.' }
    ]
  }
};
