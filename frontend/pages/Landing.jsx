import { Link } from 'react-router-dom'
import { GraduationCap, Brain, Target, CheckCircle, Globe, TrendingUp } from 'lucide-react'

const Landing = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Guidance",
      description: "Get personalized recommendations from our advanced AI counsellor"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart University Matching",
      description: "Find universities that perfectly match your profile and goals"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Application Tracking",
      description: "Track your progress with intelligent todo management"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Opportunities",
      description: "Access universities from USA, UK, Canada, Australia and more"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Profile Analysis",
      description: "Get detailed analysis of your academic strengths and weaknesses"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Step-by-Step Journey",
      description: "Guided journey from profile building to university applications"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">AI Counsellor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Your <span className="text-primary-600">AI-Powered</span> Study Abroad Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From profile building to university applications, let our AI counsellor guide you 
            through every step of your study abroad journey with personalized recommendations.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Start Your Journey
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">500+</div>
            <div className="text-gray-600 mt-2">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">50+</div>
            <div className="text-gray-600 mt-2">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">24/7</div>
            <div className="text-gray-600 mt-2">AI Guidance</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive tools and guidance for your study abroad journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to your dream university
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Build Profile", desc: "Complete your academic profile" },
              { step: "2", title: "Get Recommendations", desc: "AI suggests best-fit universities" },
              { step: "3", title: "Shortlist & Lock", desc: "Choose your target universities" },
              { step: "4", title: "Apply", desc: "Complete applications with guidance" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of students who found their dream university with AI Counsellor
          </p>
          <Link to="/signup" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <GraduationCap className="w-6 h-6 text-primary-500" />
              <span className="text-lg font-bold text-white">AI Counsellor</span>
            </div>
            <p className="text-sm">
              © 2024 AI Counsellor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing