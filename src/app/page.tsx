"use client";

import "./home.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Heart, Users, Check } from "lucide-react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Page() {
  return (
    <div>
      <Header />
      <Hero />
      <Tools />
      <Review />
      <Accordion />
      <Footer />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav transition-colors duration-300 ${
        scrolled ? "bg-gray-200 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex nav-box">
        <Image
          src="/thryvia-logo.png"
          alt="Thryvia Logo"
          width={180}
          height={40}
        />
        <div className="flex nav-link-box">
          <ul className="flex nav-links">
            <li>
              <a href="https://www.google.com">Features</a>
            </li>
            <li>
              <a href="https://www.google.com">Testimonials</a>
            </li>
            <li>
              <a href="https://www.google.com">FAQ</a>
            </li>
            <li>
              <a href="https://www.google.com">Contact</a>
            </li>
          </ul>
          <div className="flex nav-btns">
            <button className="btn btn-outline">
              <Link href="/sign-in">Login</Link>
            </button>
            <button className="btn btn-main">
              <Link href="/sign-up">Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-box">
        <div className="hero-content">
          <h2 className="hero-title">
            Find your{" "}
            <span className="hero-text-highlight">Path to Thriving</span> in
            remote work
          </h2>
          <p className="hero-subtitle">
            Enhance productivity, improve wellbeing and grow professionally with
            our simple yet powerful platform for remote workers
          </p>
          <div className="flex hero-btns">
            <button className="btn btn-main">Get Started</button>
            <button className="btn btn-outline">Learn More &darr;</button>
          </div>
          <div className="flex hero-stats">
            <div className="flex hero-stat">
              <h2 className="hero-stat-num">10k+</h2>
              <p className="hero-stat-text">Remote Workers</p>
            </div>
            <div className="flex hero-stat">
              <h2 className="hero-stat-num"> 200+</h2>
              <p className="hero-stat-text">Companies</p>
            </div>
            <div className="flex hero-stat">
              <h2 className="hero-stat-num">95%</h2>
              <p className="hero-stat-text">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="hero-img-box">
          <Image
            src="/hero.jpg"
            alt="PC hub"
            width={500}
            height={500}
            className="w-full rounded-[10px]"
          />
        </div>
      </div>
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="ffffff"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,138.7C672,128,768,160,864,165.3C960,171,1056,149,1152,154.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#222] uppercase tracking-wide mb-4">
            Simple Tools for Remote Success
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Everything you need to thrive in your remote work journey.
          </p>
        </header>
        <div className="grid grid-cols-3 gap-8 mb-14">
          <div className="p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center ">
            <div className="p-3 rounded-full bg-red-500 text-white mb-4">
              <Activity size={50} />
            </div>
            <h2 className="text-xl font-semibold mb-5">
              Productivity tracking
            </h2>
            <p className="text-center mb-8 text-[#333]">
              Track your productivity and recieive insighs to optimize your
              workflow for better results.
            </p>
            <a
              href="https://google.com"
              className="text-md font-normal bg-red-50 p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
          <div className="p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center ">
            <div className="p-3 rounded-full bg-red-500 text-white mb-4">
              <Heart size={50} />
            </div>
            <h2 className="text-xl font-semibold mb-5">Mental Wellbeing</h2>
            <p className="text-center mb-8 text-[#333]">
              Access resources designed to support your mental health and
              maintain work-life balance.
            </p>
            <a
              href="https://google.com"
              className="text-md font-normal bg-red-50 p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
          <div className="p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center ">
            <div className="p-3 rounded-full bg-red-500 text-white mb-4">
              <Users size={50} />
            </div>
            <h2 className="text-xl font-semibold mb-5">
              Professional Mentorship
            </h2>
            <p className="text-center mb-8 text-[#333]">
              Connect with experienced professionals for career guidance and
              growth opportunities.
            </p>
            <a
              href="https://google.com"
              className="text-md font-normal bg-red-50 p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full bg-gray-100 rounded-3xl overflow-hidden">
          <div className="py-8 px-14">
            <h1 className="text-3xl font-semibold mb-4 text-[#222]">
              Built for Remote Workers
            </h1>
            <p className="text-[16px] leading-7 text-[#444] mb-6">
              Our platform addresses the unique challenges of remote work
              through simple, focused tools.
            </p>
            <ul className="flex flex-col items-start gap-5 text-[16px] text-[#222]">
              <li className="flex gap-2 justify-center items-center">
                <Check size={20} />
                Personalized productivity insights
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={20} />
                Daily mental health check-ins
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={20} />
                On-demand professional mentorship
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={20} />
                Team collaboration tools
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={20} />
                Progress tracking and reports
              </li>
            </ul>
          </div>
          <div className="flex items-start w-full overflow-hidden">
            <Image
              src="/remote.jpg"
              alt="remote worker typing"
              width={600}
              height={100}
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Review() {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-20 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">
          What Our Users Say
        </h2>
        <p className="text-center max-w-xl mx-auto mb-12 text-lg">
          Join thousands of remote workers who have transformed their work
          experience with Thryvia.
        </p>
        <div className="space-y-12 max-w-5xl mx-auto">
          {[
            {
              name: "Alex Johnson",
              role: "Software Developer, TechGlobe",
              image: "/review-1.jpg",
              text: "Thryvia has transformed my remote work experience. The mental wellbeing resources helped me combat burnout, and the productivity tracking keeps me accountable and motivated.",
            },
            {
              name: "Sarah Miller",
              role: "Digital Marketing Specialist, CreativeMinds",
              image: "/customer-3.jpg",
              text: "The mentorship feature connected me with leaders in my industry who provided invaluable career guidance. My productivity has increased by 40% since using this platform!",
            },
            {
              name: "Marcus Chen",
              role: "UX Designer, DesignLabs",
              image: "/customer-6.jpg",
              text: "As someone who struggled with work-life balance, the mental wellbeing resources have been a game-changer. I feel more focused, less stressed, and more productive than ever.",
            },
          ].map(({ name, role, image, text }, i) => (
            <blockquote key={i} className="border-l-4 border-orange-500 pl-6">
              <p className="mb-4 italic text-gray-700">{text}</p>
              <footer className="flex items-center gap-4">
                <Image
                  src={image}
                  alt={`Customer ${name}`}
                  width={50}
                  height={50}
                  className="rounded-full"
                  priority
                />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-600">{role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-20 flex justify-center items-center gap-18">
          <Image
            src="/microsoft.png"
            alt={`Microsoft logo`}
            width={150}
            height={100}
            priority
          />

          <Image
            src="/shopify-logo.png"
            alt={`Shopify logo`}
            width={150}
            height={100}
            priority
          />
          <Image
            src="/atlassian.png"
            alt={`Atlassian logo`}
            width={150}
            height={100}
            priority
          />
          <Image
            src="/Dropbox.png"
            alt={`Dropbox logo`}
            width={150}
            height={100}
            priority
          />
        </div>
      </div>
    </section>
  );
}

function Accordion() {
  const faqs = [
    {
      question: "How does Thryvia help improve productivity?",
      answer:
        "Thryvia boosts productivity by offering tools for goal tracking, daily check-ins, and personalized habit building to keep users focused and consistent.",
    },
    {
      question: "What mental wellbeing resources are available?",
      answer:
        "Thryvia provides guided meditations, stress-reduction exercises, and educational content focused on maintaining mental wellness.",
    },
    {
      question: "How does the professional mentorship feature work?",
      answer:
        "Users can connect with industry professionals for one-on-one guidance, set mentorship goals, and track progress through the app.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Yes, Thryvia uses end-to-end encryption and adheres to strict privacy protocols to ensure your data is safe and secure.",
    },
    {
      question: "Can managers track their team's performance?",
      answer:
        "Managers can view team-wide progress reports and productivity trends without accessing individual private data, ensuring both insight and privacy.",
    },
    {
      question: "How can I get started with Thryvia?",
      answer:
        "Simply sign up, complete your onboarding profile, and Thryvia will guide you through setting goals and building routines tailored to your needs.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <p className="mb-10 text-gray-700 text-center">
        Find answers to common questions about Thryvia and how it can help you
        thrive in remote work.
      </p>
      <div className="space-y-6">
        {faqs.map(({ question, answer }, i) => (
          <AccordionItem question={question} answer={answer} key={i} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold mb-2">Still have questions?</h3>
        <p className="mb-6 text-gray-700">
          Contact our support team for more information or to schedule a demo.
        </p>
        <button className="btn btn-main bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">
          Contact us
        </button>
      </div>
    </section>
  );
}

type AccordionItemProps = {
  question: string;
  answer: string;
};

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={handleToggle}
      >
        <p className="text-orange-600 font-semibold hover:underline">
          {question}
        </p>
        <span className="text-orange-600 font-bold text-xl select-none">
          {isOpen ? "-" : "+"}
        </span>
      </div>

      {isOpen && <div>{answer}</div>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-6 pb-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm flex flex-col gap-4 justify-center align-start">
          <Image
            src="/thryvia-logo.png"
            width={200}
            height={50}
            alt="Thryvia Logo"
          />
          <p>Your path to thriving in the remote work environment.</p>
          <div className="flex space-x-6">
            {/* Social icons placeholders */}
            <FaFacebook
              size={25}
              className="hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaLinkedinIn
              size={25}
              className="hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaInstagram
              size={25}
              className="hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaTwitter
              size={25}
              className="hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-14 text-md text-gray-400">
          <div>
            <h2 className="font-semibold text-white mb-3">Platform</h2>
            <ul className="space-y-3">
              <li>
                <a href="">Features</a>
              </li>
              <li>
                <a href="">Testimonials</a>
              </li>
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-3">Resources</h2>
            <ul className="space-y-3">
              <li>
                <a href="">Blog</a>
              </li>
              <li>
                <a href="">Guides</a>
              </li>
              <li>
                <a href="">Webinar</a>
              </li>
              <li>
                <a href="">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-3">Company</h2>
            <ul className="space-y-3">
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Careers</a>
              </li>
              <li>
                <a href="">Press Kit</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-3">Contact Us</h2>
            <address className="not-italic space-y-3">
              <p>info@thryvia.com</p>
              <p>+1 (234) 567-890</p>
            </address>
          </div>
        </div>
      </div>
      <hr className="my-8 border-gray-700" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-500 px-6 md:px-20">
        <span>&copy; 2025 Thryvia. All rights reserved.</span>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="https://facebook.com" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="https://facebook.com" className="hover:text-white">
            Terms of Service
          </a>
          <a href="https://facebook.com" className="hover:text-white">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
