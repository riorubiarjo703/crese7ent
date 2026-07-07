import { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { AppleIcon } from '@/components/SocialIcon/AppleIcon'
import { SocialIcon } from '@/components/SocialIcon'
import { FooterSocialLinks } from '@/globals/Footer/FooterSocialLinks'
import { PublicContextProps } from '@/utilities/publicContextProps'

const Footer5: React.FC<{ footer: Footer; publicContext: PublicContextProps }> = ({
  footer,
  publicContext,
}) => {
  return (
    <section className="py-32">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {footer.navItems &&
              footer.navItems.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold">{section.title}</h3>
                  <ul className="text-muted-foreground space-y-4">
                    {section.subNavItems &&
                      section.subNavItems.map((link, linkIdx) => (
                        <li key={linkIdx} className="hover:text-primary font-medium">
                          <CMSLink publicContext={publicContext} {...link.link} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
          </div>
          <div className="mt-10 gap-10">
            <div className="grid gap-8 lg:grid-cols-4 lg:flex-row">
              <div className="col-span-3">
                <p className="mb-3 font-bold">Follow us</p>
                <FooterSocialLinks
                  links={footer.socialLinks}
                  className="text-muted-foreground flex items-center gap-2"
                  itemClassName="font-medium"
                  wrapIcon={(icon) => (
                    <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                      {icon}
                    </span>
                  )}
                />
              </div>
              <div>
                <p className="mb-3 font-bold">Mobile App</p>
                <ul className="text-muted-foreground flex items-center gap-2">
                  <li className="font-medium">
                    <a href="#">
                      <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                        <SocialIcon type="android" className="size-6" />
                      </span>
                    </a>
                  </li>
                  <li className="font-medium">
                    <a href="#">
                      <span className="bg-muted hover:text-primary flex size-12 items-center justify-center rounded-full transition-colors">
                        <AppleIcon className="size-6" />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-24 border-t pt-8">
            <p className="text-muted-foreground text-center text-sm font-medium">
              {footer.copyright && `© ${new Date().getFullYear()} ${footer.copyright}`}
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}

export default Footer5
