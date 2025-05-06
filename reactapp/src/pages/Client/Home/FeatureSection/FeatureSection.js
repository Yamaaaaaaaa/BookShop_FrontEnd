import { Zap, Shield, ThumbsUp, Star } from 'lucide-react'
import "./FeatureSection.scss"

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap />,
      title: "Quick Delivery",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <Shield />,
      title: "Secure Payment",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <ThumbsUp />,
      title: "Best Quality",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      icon: <Star />,
      title: "Return Guarantee",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ]

  return (
    <div className="features-section">
      <div className="features-section__container">
        <div className="features-section__grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card__icon-container">
                {feature.icon}
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
