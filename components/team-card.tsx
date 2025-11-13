import Image from "next/image"
import type { TeamMember } from "@/lib/content-loader"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-gradient-to-b from-secondary/10 to-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      {member.photo && (
        <div className="relative h-64 w-full overflow-hidden bg-secondary/20">
          <Image src={member.photo || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
        <p className="text-primary font-semibold mb-2">{member.position}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.specialty}</p>
        <p className="text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

        <div className="border-t border-secondary/20 pt-4 space-y-2 text-sm">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Experiencia:</span> {member.experience}+ años
          </p>
          {member.certifications.length > 0 && (
            <div>
              <p className="font-semibold text-foreground mb-1">Certificaciones:</p>
              <ul className="space-y-1">
                {member.certifications.map((cert, index) => (
                  <li key={index} className="text-muted-foreground">
                    • {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
