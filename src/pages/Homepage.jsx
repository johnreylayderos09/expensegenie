// src/pages/Homepage.js
import {
  React,
  useEffect,
  useState,
  NavLink,
  Swiper,
  SwiperSlide,
  Pagination,
  Navigation,
  Card,
  CardContent,
  Button,
  supabase,
  SupabaseClient
} from '../imports';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


export default function Homepage() {
  const [isOpen, setIsOpen] = useState(false);

 const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const result = await supabase.auth.getUser();

      if (result.error) {
        console.error("Error fetching user:", result.error.message);
        return;
      }

      if (result.data.user) {
        const displayName = result.data.user.user_metadata?.full_name || result.data.user.user_metadata?.name || result.data.user.email;
        setUserName(displayName);
      }
    };

    getUser();
  }, []);


  const stats = [
    { title: "💸 Spent this month", value: "₱12,500" },
    { title: "📊 Budget progress", value: "70% used" },
    { title: "🏦 Savings progress", value: "₱8,200 saved" },
  ];

  const recentTransactions = [
    { id: 1, name: "Groceries", amount: "₱1,200", date: "Sep 6" },
    { id: 2, name: "Grab Ride", amount: "₱350", date: "Sep 5" },
    { id: 3, name: "Netflix", amount: "₱459", date: "Sep 5" },
    { id: 4, name: "Coffee", amount: "₱150", date: "Sep 4" },
  ];

  const spendingData = [
    { category: "Food", amount: 5000 },
    { category: "Transport", amount: 1500 },
    { category: "Leisure", amount: 2000 },
    { category: "Shopping", amount: 4000 },
  ];

  const tipOfTheDay =
    "Try reducing eating out by 15% to save ₱1,200 this month.";
  const motivation = "💡 Every peso saved today is freedom tomorrow.";

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition ${
      isActive
        ? "shadow-md bg-amber-100 text-amber-700"
        : "hover:shadow-md hover:bg-gray-100"
    }`;

  const features = [
    { img: "/src/assets/features/feature1.png", title: "AI adviser" },
    { img: "/src/assets/features/feature2.png", title: "Spending Insights" },
    { img: "/src/assets/features/feature3.png", title: "Budget Planning" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Navbar */}
{/* Navbar (leave full width, no max-w) */}
<header className="bg-blue-50 shadow px-6 py-4">
  <div className="flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-center gap-3 font-bold text-lg text-gray-800">
      <img
        src="/src/assets/icon.png"
        alt="Genie Logo"
        className="w-10 h-10 rounded-full"
      />
      <span>Expense Genie</span>
    </div>

    {/* Nav Links (Desktop) */}
    <nav className="hidden md:flex gap-10 text-gray-800 font-semibold">
      <NavLink to="/homepage" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/dashboard" className={navLinkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About us
      </NavLink>
    </nav>

    {/* Hamburger Menu (Mobile) */}
    <button
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span
        className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
        }`}
      ></span>
      <span
        className={`absolute h-1 w-8 bg-gray-800 rounded transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`absolute h-1 w-8 bg-gray-800 rounded transition-transform duration-300 ${
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
        }`}
      ></span>
    </button>
  </div>

  {/* Mobile Dropdown */}
  {isOpen && (
    <div className="flex justify-center mt-3">
      <div className="flex flex-col space-y-2 md:hidden font-semibold text-gray-800 text-center">
        <NavLink to="/homepage" onClick={() => setIsOpen(false)} className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)} className={navLinkClass}>
          About us
        </NavLink>
      </div>
    </div>
  )}
</header>


      {/* Hero Section */}
      <section className="p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
           Welcome back, {userName || "Guest"} 👋
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <Card key={i} className="rounded-2xl shadow-md bg-white">
              <CardContent className="p-6 text-center">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="text-2xl font-bold text-amber-700">{s.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

            {/* Features + Transactions Section */}
         <section className="p-6 flex flex-col md:flex-row gap-6">
        {/* Transactions (take most of the space) */}
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800 text-left">
              Recent Transactions
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md divide-y w-full">
            {recentTransactions.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-3 text-center px-6 py-3"
              >
                <span>{t.name}</span>
                <span className="font-semibold">{t.amount}</span>
                <span className="text-gray-500 text-sm">{t.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Swiper (side widget on desktop, stacked on mobile) */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="w-full max-w-2xl custom-swiper"
          >
            {features.map((f, idx) => (
              <SwiperSlide key={idx}>
                
                <div className="flex flex-col items-center pb-6 gap-1.5">
                  <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <img
                      src={f.img}
                      alt={f.title}
                      className="w-120 h-37 object-contain gap-1.5"
                    />
                  </div>
                  <div className="flex flex-col items-center pb-4 gap-1.5"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>



      {/* Insights Section */}
      <section className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Spending Insights
        </h2>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={spendingData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-4 text-gray-700 font-medium">
            Your biggest expense this month:{" "}
            <span className="font-bold">Food 🍔</span>
          </p>
        </div>
      </section>

      {/* Tip Section */}
      <section className="p-6 text-center">
        <Card className="bg-gradient-to-r from-amber-100 to-yellow-100 shadow-md rounded-2xl">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              AI Tip of the Day:
            </p>
            <p className="text-gray-700 mb-4">{tipOfTheDay}</p>
            <p className="italic text-gray-600">{motivation}</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
