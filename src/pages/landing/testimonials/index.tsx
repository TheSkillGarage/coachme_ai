import { Avatar } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Card } from '../../../components/ui/card';
import { Rating } from '../../../components/ui/rating';
import imgAvatar from '../../../assets/testimonial.png';

interface Testimonial {
  id: number;
  fullName: string;
  position: string;
  companyName: string;
  rating: number;
  quote: string;
  date: string;
  avatarSrc: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    fullName: 'Tina Jayden',
    position: 'Marketing Analyst',
    companyName: 'Google',
    rating: 2,
    quote:
      'This platform made job hunting so much easier! Within two weeks, I had three interviews lined up and landed a job I love. The AI-generated cover letters saved me so much time.',
    date: 'August 25, 2025',
    avatarSrc: imgAvatar,
  },
  {
    id: 2,
    fullName: 'David Zion',
    position: 'Software Developer',
    companyName: 'TriniTech TriniTech TriniTech',
    rating: 5,
    quote:
      'This platform made job hunting so much easier! Within two weeks, I had three interviews lined up and landed a job I love. The AI-generated cover letters saved me so much time. I’ve used several job platforms before, but this one is on another level. From personalized job recommendations to optimized cover letters, it’s a game changer.',
    date: 'August 25, 2025',
    avatarSrc: imgAvatar,
  },
  {
    id: 3,
    fullName: 'Aisha Bello',
    position: 'Data Analyst',
    companyName: 'DTHub',
    rating: 4,
    quote:
      'This platform made job hunting so much easier! Within two weeks, I had three interviews lined up and landed a job I love.',
    date: 'August 25, 2025',
    avatarSrc: imgAvatar,
  },
];

const TestimonialBlock: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <Card
      className="flex flex-col justify-between min-h-[299px] md:min-h-[302px]
               min-w-[280px] w-full xl:w-[411px] xl:flex-1
               box-border p-4"
    >
      <div>
        <div className="flex gap-2 mb-4">
          <Avatar size="lg" className="min-w-12" src={testimonial.avatarSrc} />
          <div className="flex flex-col">
            <p className="font-semibold text-[18px] md:text-[20px] mb-1 leading-[140%]">
              {testimonial.fullName}
            </p>
            <p className="text-grey-300 text-sm">
              {testimonial.position} at {testimonial.companyName}
            </p>
          </div>
        </div>
        <div className="mb-4 flex">
          <Rating rating={testimonial.rating} color="#ECBC24" />
        </div>
        <div className="mb-4">
          <p className="text-lg h-[125px] font-normal text-[18px] leading-[140%] tracking-[0] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
            {testimonial.quote}
          </p>
        </div>
      </div>
      <div>
        <p className="text-grey-300 text-sm">{testimonial.date}</p>
      </div>
    </Card>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section
      id='testimonials'
      className="flex flex-col items-center justify-center
         px-5 md:px-20
         mb-12 mx-auto max-w-7xl " 
    >
      <Badge className="bg-transparent border border-primary-500 gap-2 mb-4 py-1 px-3 text-primary-500">
        Testimonials
      </Badge>

      <h4 className="font-semibold text-2xl md:text-4xl text-center text-grey-500 mb-12">
        Trusted by Job Seekers Everywhere
      </h4>

      <div className="flex flex-wrap lg:flex-row flex-1 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialBlock key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
