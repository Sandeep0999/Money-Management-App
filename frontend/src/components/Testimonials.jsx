import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      text: "MoneyMate has completely transformed how I manage my finances. The analytics are incredibly insightful!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      text: "Finally, a money management app that's both powerful and easy to use. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Marketing Manager",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      text: "The budget tracking feature helped me save $500 this month. This app is a game-changer!",
      rating: 5,
    },
    {
      name: "David Rodriguez",
      role: "Entrepreneur",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      text: "Best investment I made for my business. The expense tracking is seamless and accurate.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who have transformed their financial lives with MoneyMate
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm mb-6 leading-relaxed italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div>
                  <h4 className="font-semibold text-dark text-sm">{testimonial.name}</h4>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
