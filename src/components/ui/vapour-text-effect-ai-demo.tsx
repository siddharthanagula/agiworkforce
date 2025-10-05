import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

export function VaporizeTextAIDemo() {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-8">
      <div className="w-full max-w-4xl">
        {/* AI Workforce Hero Text */}
        <VaporizeTextCycle
          texts={["AI Workforce", "The Future", "Is Here"]}
          font={{
            fontFamily: "Inter, sans-serif",
            fontSize: "80px",
            fontWeight: 700
          }}
          color="rgb(255, 255, 255)"
          spread={8}
          density={7}
          animation={{
            vaporizeDuration: 3,
            fadeInDuration: 1.5,
            waitDuration: 1
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H1}
        />
        
        {/* Subtitle with different animation */}
        <div className="mt-8 flex justify-center">
          <VaporizeTextCycle
            texts={["Build Your Dream Team", "With AI Employees", "Scale Infinitely"]}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "32px",
              fontWeight: 400
            }}
            color="rgb(200, 200, 200)"
            spread={4}
            density={5}
            animation={{
              vaporizeDuration: 2,
              fadeInDuration: 1,
              waitDuration: 0.8
            }}
            direction="right-to-left"
            alignment="center"
            tag={Tag.P}
          />
        </div>
      </div>
    </div>
  );
}

export function VaporizeTextTechDemo() {
  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen flex justify-center items-center p-8">
      <div className="w-full max-w-6xl">
        {/* Technology Stack Animation */}
        <VaporizeTextCycle
          texts={["React", "TypeScript", "AI", "Innovation"]}
          font={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "60px",
            fontWeight: 600
          }}
          color="rgb(147, 197, 253)"
          spread={6}
          density={6}
          animation={{
            vaporizeDuration: 2.5,
            fadeInDuration: 1.2,
            waitDuration: 0.6
          }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H2}
        />
        
        {/* Features Animation */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <VaporizeTextCycle
              texts={["Fast", "Efficient", "Smart"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                fontWeight: 500
              }}
              color="rgb(34, 197, 94)"
              spread={3}
              density={4}
              animation={{
                vaporizeDuration: 1.8,
                fadeInDuration: 0.8,
                waitDuration: 0.5
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H3}
            />
          </div>
          
          <div className="text-center">
            <VaporizeTextCycle
              texts={["Scalable", "Reliable", "Secure"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                fontWeight: 500
              }}
              color="rgb(59, 130, 246)"
              spread={3}
              density={4}
              animation={{
                vaporizeDuration: 1.8,
                fadeInDuration: 0.8,
                waitDuration: 0.5
              }}
              direction="right-to-left"
              alignment="center"
              tag={Tag.H3}
            />
          </div>
          
          <div className="text-center">
            <VaporizeTextCycle
              texts={["Modern", "Advanced", "Future"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "24px",
                fontWeight: 500
              }}
              color="rgb(168, 85, 247)"
              spread={3}
              density={4}
              animation={{
                vaporizeDuration: 1.8,
                fadeInDuration: 0.8,
                waitDuration: 0.5
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
