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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
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
          height={50}
          className="w-24 sm:w-28 md:w-32 lg:w-40"
        />

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex nav-link-box">
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

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
          <div className="fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-2xl p-6 animate-slideInRight">
            <div className="flex justify-between items-center mb-8">
              <Image
                src="/thryvia-logo.png"
                alt="Thryvia Logo"
                width={100}
                height={28}
                className="w-28 h-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="space-y-6 mb-8">
              <li>
                <a
                  href="https://www.google.com"
                  className="block text-lg font-medium text-gray-700 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com"
                  className="block text-lg font-medium text-gray-700 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com"
                  className="block text-lg font-medium text-gray-700 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com"
                  className="block text-lg font-medium text-gray-700 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="space-y-4">
              <button className="btn btn-outline w-full text-base py-4 font-semibold">
                <Link href="/sign-in">Login</Link>
              </button>
              <button className="btn btn-main w-full text-base py-4 font-semibold">
                <Link href="/sign-up">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      )}
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
          <div className="hero-btns">
            <button className="btn btn-main">
              <Link href="/sign-up">Get Started</Link>
            </button>
            <button className="btn btn-outline">Learn More &darr;</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <h2 className="hero-stat-num">10k+</h2>
              <p className="hero-stat-text">Remote Workers</p>
            </div>
            <div className="hero-stat">
              <h2 className="hero-stat-num">200+</h2>
              <p className="hero-stat-text">Companies</p>
            </div>
            <div className="hero-stat">
              <h2 className="hero-stat-num">95%</h2>
              <p className="hero-stat-text">Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="hero-img-box">
          <Image
            src="/hero.jpg"
            alt="PC hub"
            width={600}
            height={600}
            className="hero-img"
          />
        </div>
      </div>
      <div className="hero-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            fill="#ffffff"
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
    <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#222] uppercase tracking-wide mb-2 sm:mb-3 md:mb-4">
            Simple Tools for Remote Success
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium">
            Everything you need to thrive in your remote work journey.
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-14">
          <div className="p-4 sm:p-6 md:p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center">
            <div className="p-2 sm:p-3 rounded-full bg-red-500 text-white mb-3 sm:mb-4">
              <Activity
                size={32}
                className="sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
              />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-5 text-center">
              Productivity tracking
            </h2>
            <p className="text-center mb-4 sm:mb-6 md:mb-8 text-[#333] text-xs sm:text-sm md:text-base">
              Track your productivity and recieive insighs to optimize your
              workflow for better results.
            </p>
            <a
              href="https://google.com"
              className="text-xs sm:text-sm md:text-base font-normal bg-red-50 p-2 sm:p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
          <div className="p-4 sm:p-6 md:p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center">
            <div className="p-2 sm:p-3 rounded-full bg-red-500 text-white mb-3 sm:mb-4">
              <Heart
                size={32}
                className="sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
              />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-5 text-center">
              Mental Wellbeing
            </h2>
            <p className="text-center mb-4 sm:mb-6 md:mb-8 text-[#333] text-xs sm:text-sm md:text-base">
              Access resources designed to support your mental health and
              maintain work-life balance.
            </p>
            <a
              href="https://google.com"
              className="text-xs sm:text-sm md:text-base font-normal bg-red-50 p-2 sm:p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
          <div className="p-4 sm:p-6 md:p-8 rounded-md shadow-md bg-gray-20 flex flex-col justify-center items-center sm:col-span-2 lg:col-span-1">
            <div className="p-2 sm:p-3 rounded-full bg-red-500 text-white mb-3 sm:mb-4">
              <Users
                size={32}
                className="sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
              />
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-5 text-center">
              Professional Mentorship
            </h2>
            <p className="text-center mb-4 sm:mb-6 md:mb-8 text-[#333] text-xs sm:text-sm md:text-base">
              Connect with experienced professionals for career guidance and
              growth opportunities.
            </p>
            <a
              href="https://google.com"
              className="text-xs sm:text-sm md:text-base font-normal bg-red-50 p-2 sm:p-3 rounded-lg hover:text-red-500 hover:underline transitions-all duration-300"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="py-6 sm:py-8 px-6 sm:px-10 md:px-14">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-[#222]">
              Built for Remote Workers
            </h1>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 text-[#444] mb-4 sm:mb-6">
              Our platform addresses the unique challenges of remote work
              through simple, focused tools.
            </p>
            <ul className="flex flex-col items-start gap-3 sm:gap-5 text-sm sm:text-base text-[#222]">
              <li className="flex gap-2 justify-center items-center">
                <Check size={16} className="sm:w-5 sm:h-5" />
                Personalized productivity insights
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={16} className="sm:w-5 sm:h-5" />
                Daily mental health check-ins
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={16} className="sm:w-5 sm:h-5" />
                On-demand professional mentorship
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={16} className="sm:w-5 sm:h-5" />
                Team collaboration tools
              </li>
              <li className="flex gap-2 justify-center items-center">
                <Check size={16} className="sm:w-5 sm:h-5" />
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
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Review() {
  return (
    <section className="bg-gray-100 py-12 sm:py-16 px-4 sm:px-6 md:px-20 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
          What Our Users Say
        </h2>
        <p className="text-center max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base md:text-lg">
          Join thousands of remote workers who have transformed their work
          experience with Thryvia.
        </p>
        <div className="space-y-8 sm:space-y-12 max-w-5xl mx-auto">
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
            <blockquote
              key={i}
              className="border-l-4 border-orange-500 pl-4 sm:pl-6"
            >
              <p className="mb-3 sm:mb-4 italic text-gray-700 text-sm sm:text-base">
                {text}
              </p>
              <footer className="flex items-center gap-3 sm:gap-4">
                <Image
                  src={image}
                  alt={`Customer ${name}`}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
                  priority
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-16 sm:mt-20 flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-18">
          <Image
            src="/microsoft.png"
            alt={`Microsoft logo`}
            width={100}
            height={50}
            className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12"
            priority
          />

          <Image
            src="/shopify-logo.png"
            alt={`Shopify logo`}
            width={100}
            height={50}
            className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12"
            priority
          />
          <Image
            src="/atlassian.png"
            alt={`Atlassian logo`}
            width={120}
            height={80}
            className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14"
            priority
          />
          <Image
            src="/Dropbox.png"
            alt={`Dropbox logo`}
            width={120}
            height={80}
            className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14"
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
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-20 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <p className="mb-8 sm:mb-10 text-gray-700 text-center text-sm sm:text-base">
        Find answers to common questions about Thryvia and how it can help you
        thrive in remote work.
      </p>
      <div className="space-y-4 sm:space-y-6">
        {faqs.map(({ question, answer }, i) => (
          <AccordionItem question={question} answer={answer} key={i} />
        ))}
      </div>
      <div className="mt-10 sm:mt-12 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-sm sm:text-base">
          Still have questions?
        </h3>
        <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base">
          Contact our support team for more information or to schedule a demo.
        </p>
        <button className="btn btn-main bg-orange-600 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-orange-700 transition text-sm sm:text-base">
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
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div
        className="flex justify-between items-center mb-3 sm:mb-4 cursor-pointer"
        onClick={handleToggle}
      >
        <p className="text-orange-600 font-semibold hover:underline text-sm sm:text-base pr-2">
          {question}
        </p>
        <span className="text-orange-600 font-bold text-lg sm:text-xl select-none flex-shrink-0">
          {isOpen ? "-" : "+"}
        </span>
      </div>

      {isOpen && (
        <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-6 pb-10 px-4 sm:px-6 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 sm:gap-12">
        <div className="max-w-sm flex flex-col gap-3 sm:gap-4 justify-center align-start">
          <Image
            src="/thryvia-logo.png"
            width={160}
            height={40}
            alt="Thryvia Logo"
            className="w-32 sm:w-40 md:w-48"
          />
          <p className="text-sm sm:text-base">
            Your path to thriving in the remote work environment.
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            {/* Social icons placeholders */}
            <FaFacebook
              size={20}
              className="sm:w-6 sm:h-6 hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaLinkedinIn
              size={20}
              className="sm:w-6 sm:h-6 hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaInstagram
              size={20}
              className="sm:w-6 sm:h-6 hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
            <FaTwitter
              size={20}
              className="sm:w-6 sm:h-6 hover:text-gray-500 transition-color duration-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-14 text-sm sm:text-base text-gray-400">
          <div>
            <h2 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
              Platform
            </h2>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
              Resources
            </h2>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Guides
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Webinar
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
              Company
            </h2>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li>
                <a href="" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Press Kit
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
              Contact Us
            </h2>
            <address className="not-italic space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <p>info@thryvia.com</p>
              <p>+1 (234) 567-890</p>
            </address>
          </div>
        </div>
      </div>
      <hr className="my-6 sm:my-8 border-gray-700" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-xs text-gray-500 px-4 sm:px-6 md:px-20">
        <span>&copy; 2025 Thryvia. All rights reserved.</span>
        <div className="flex space-x-4 sm:space-x-6 mt-2 md:mt-0">
          <a
            href="https://facebook.com"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="https://facebook.com"
            className="hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="https://facebook.com"
            className="hover:text-white transition-colors"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
