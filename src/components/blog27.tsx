'use client'
import { ArrowRight, Slash } from 'lucide-react'
import { Fragment, useCallback, useMemo, useState } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/utilities/index'

interface BreadcrumbItem {
  label: string
  link: string
}

interface Post {
  category: string
  title: string
  summary: string
  link: string
  cta: string
  thumbnail: string
}

interface Category {
  label: string
  value: string
}

interface FilterFormProps {
  categories: Array<Category>
  value: string
  onValueChange: (value: string) => void
}

interface BlogsResultProps {
  posts: Array<Post>
  categories: Array<Category>
}

interface BreadcrumbBlogProps {
  breadcrumb: Array<BreadcrumbItem>
}

const POSTS_PER_PAGE = 6

const BREADCRUMB: Array<BreadcrumbItem> = [
  {
    label: 'Resources',
    link: '#',
  },
  {
    label: 'Blogs',
    link: '#',
  },
]

const CATEGORIES: Array<Category> = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Productivity',
    value: 'productivity',
  },
  {
    label: 'Accessibility',
    value: 'accessibility',
  },
  {
    label: 'Performance',
    value: 'performance',
  },
]

const PRIMARY_POST: Post = {
  category: 'Innovation Spotlight',
  title: 'How AI is Transforming Frontend Development',
  summary:
    'Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.',
  link: '#',
  cta: 'Discover the Future',
  thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
}

const ALL_POSTS: Array<Post> = [
  {
    category: 'Productivity',
    title: '5 VS Code Extensions That Will Save You Hours',
    summary:
      'Discover must-have extensions to boost your coding efficiency and streamline your workflow.',
    link: '#',
    cta: 'Boost Your Editor',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  {
    category: 'Productivity',
    title: 'Time Management for Developers: What Really Works',
    summary:
      'Learn proven strategies to avoid burnout and stay on top of your tasks without stress.',
    link: '#',
    cta: 'Manage Your Time',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  {
    category: 'Productivity',
    title: 'Automate Your Workflow with Task Runners',
    summary:
      'Use tools like Gulp, npm scripts, and GitHub Actions to automate repetitive development tasks.',
    link: '#',
    cta: 'Automate Now',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
  {
    category: 'Productivity',
    title: 'Effective Daily Routines for Developers',
    summary:
      'Discover routines that top developers follow to stay productive, creative, and focused.',
    link: '#',
    cta: 'Find Your Flow',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg',
  },
  {
    category: 'Productivity',
    title: 'Master Git Like a Pro with These Shortcuts',
    summary: 'Speed up your version control workflow with powerful Git aliases and tips.',
    link: '#',
    cta: 'Speed Up Git',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg',
  },
  {
    category: 'Productivity',
    title: 'Reducing Context Switching as a Developer',
    summary: 'Minimize distractions and deep-dive into your code with focused work practices.',
    link: '#',
    cta: 'Stay Focused',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
  {
    category: 'Productivity',
    title: 'Remote Work Setup: Tools for a Distraction-Free Environment',
    summary:
      'Set up your space and software stack for maximum productivity when working from home.',
    link: '#',
    cta: 'Upgrade Your Setup',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  {
    category: 'Productivity',
    title: 'Pomodoro for Coders: Does It Really Work?',
    summary:
      'A practical review of the Pomodoro technique and its effectiveness for software development.',
    link: '#',
    cta: 'Try the Method',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  {
    category: 'Accessibility',
    title: 'Why Accessibility Should Be Part of Your MVP',
    summary: 'Making your product inclusive from day one improves usability and reach.',
    link: '#',
    cta: 'Learn Why',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
  {
    category: 'Accessibility',
    title: 'Using ARIA Roles Correctly in Your Web App',
    summary: 'Understand how to enhance screen reader support using ARIA roles and landmarks.',
    link: '#',
    cta: 'Improve Semantics',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg',
  },
  {
    category: 'Accessibility',
    title: 'Color Contrast Tips for Better Readability',
    summary: 'Learn how to choose accessible color combinations that meet WCAG standards.',
    link: '#',
    cta: 'Fix Your Colors',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg',
  },
  {
    category: 'Accessibility',
    title: 'Keyboard Navigation: The Overlooked User Experience',
    summary:
      'Ensure your website is fully usable with just a keyboard, for accessibility and speed.',
    link: '#',
    cta: 'Test Navigation',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
  {
    category: 'Accessibility',
    title: 'Accessible Forms: Labels, Errors & Feedback',
    summary:
      'Improve the usability of your forms by ensuring screen readers and users receive clear instructions.',
    link: '#',
    cta: 'Fix Your Forms',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  {
    category: 'Accessibility',
    title: "Screen Reader Testing: A Beginner's Guide",
    summary: 'How to test your site with popular screen readers and what to listen for.',
    link: '#',
    cta: 'Start Testing',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  {
    category: 'Accessibility',
    title: 'Inclusive Design Thinking in UI Development',
    summary: 'Design interfaces that consider users of all abilities from the start.',
    link: '#',
    cta: 'Design for All',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
  {
    category: 'Accessibility',
    title: 'Accessibility Audits: Tools and Checklists',
    summary:
      'Perform thorough accessibility audits with tools like Axe, Lighthouse, and manual checklists.',
    link: '#',
    cta: 'Audit Now',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg',
  },
  {
    category: 'Performance',
    title: 'Lazy Loading Images with Modern HTML',
    summary: 'Improve load times by using native lazy-loading and fallback strategies for images.',
    link: '#',
    cta: 'Optimize Images',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg',
  },
  {
    category: 'Performance',
    title: 'Minifying JavaScript Without Breaking Your App',
    summary: 'Best practices for minifying and tree-shaking your JS bundles to boost speed.',
    link: '#',
    cta: 'Shrink Your Code',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
  {
    category: 'Performance',
    title: 'Web Vitals Explained: CLS, LCP, FID',
    summary: 'Learn how to measure and improve Core Web Vitals for a better user experience.',
    link: '#',
    cta: 'Improve Vitals',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg',
  },
  {
    category: 'Performance',
    title: 'Server-Side Rendering vs Client-Side: Which is Faster?',
    summary: 'Compare SSR and CSR strategies and when to use each for better performance.',
    link: '#',
    cta: 'Explore Options',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg',
  },
  {
    category: 'Performance',
    title: 'Optimizing Fonts for Faster Page Loads',
    summary:
      'Learn techniques for loading fonts without blocking rendering or causing layout shifts.',
    link: '#',
    cta: 'Speed Up Fonts',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg',
  },
  {
    category: 'Performance',
    title: 'Reduce JavaScript Bundle Size with Code Splitting',
    summary: 'Use dynamic imports and route-based chunking to reduce initial load time.',
    link: '#',
    cta: 'Split It Up',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg',
  },
  {
    category: 'Performance',
    title: 'Caching Strategies for Modern Web Apps',
    summary:
      'Leverage HTTP caching, service workers, and CDNs to improve speed and offline support.',
    link: '#',
    cta: 'Cache Smarter',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-6.svg',
  },
  {
    category: 'Performance',
    title: 'Analyzing Performance Bottlenecks with Chrome DevTools',
    summary:
      'Use the Performance tab in DevTools to track down and fix runtime issues in your app.',
    link: '#',
    cta: 'Analyze Now',
    thumbnail: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
  },
]

/** Round-robin order so "All" shows a mix of categories; single-select filters then feel different. */
function interleavePostsByCategory(posts: Post[]): Post[] {
  const productivity = posts.filter((p) => p.category === 'Productivity')
  const accessibility = posts.filter((p) => p.category === 'Accessibility')
  const performance = posts.filter((p) => p.category === 'Performance')
  const n = Math.max(productivity.length, accessibility.length, performance.length)
  const out: Post[] = []
  for (let i = 0; i < n; i++) {
    if (productivity[i]) out.push(productivity[i])
    if (accessibility[i]) out.push(accessibility[i])
    if (performance[i]) out.push(performance[i])
  }
  return out
}

const POSTS: Post[] = interleavePostsByCategory(ALL_POSTS)

const FilterForm = ({ categories, value, onValueChange }: FilterFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="flex w-full min-w-0 flex-row flex-nowrap items-center justify-start gap-x-4 overflow-x-auto overflow-y-hidden pb-1 [scrollbar-gutter:stable] sm:gap-x-6"
        aria-label="Filter by category"
      >
        {categories.map((category) => {
          const id = `blog27-cat-${category.value}`
          return (
            <div key={category.value} className="flex shrink-0 items-center gap-2.5 py-1">
              <RadioGroupItem value={category.value} id={id} />
              <Label htmlFor={id} className="text-foreground cursor-pointer whitespace-nowrap">
                {category.label}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </form>
  )
}

const BlogsResult = ({ posts, categories }: BlogsResultProps) => {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.value ?? 'all')
  const handleFilterChange = useCallback((next: string) => {
    setSelectedCategory(next)
    setVisibleCount(POSTS_PER_PAGE)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
  }, [])
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts
    }
    return posts.filter((post) => post.category.toLowerCase() === selectedCategory)
  }, [posts, selectedCategory])

  const postsToDisplay = filteredPosts

  const hasMore = visibleCount < postsToDisplay.length

  return (
    <div>
      <FilterForm
        categories={categories}
        value={selectedCategory}
        onValueChange={handleFilterChange}
      />
      <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {postsToDisplay.slice(0, visibleCount).map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
        <div className="flex justify-center">
          {hasMore && (
            <Button variant="secondary" onClick={handleLoadMore}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              ) : null}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

const BlogCard = ({ title, thumbnail, summary, link, cta }: Post) => {
  return (
    <a href={link} className="block h-full w-full">
      <Card className="border-border flex h-full flex-col rounded-lg border py-0 shadow-none ring-0">
        <CardContent className="flex flex-1 flex-col p-0">
          <AspectRatio ratio={1.520833333} className="overflow-hidden">
            <img
              src={thumbnail}
              alt={title}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>
          <div className="flex flex-1 flex-col justify-between gap-5 p-5">
            <div className="space-y-5">
              <h2 className="text-lg leading-tight font-medium md:text-xl">{title}</h2>
              <div className="w-full max-w-[20rem]">
                <p className="text-muted-foreground text-sm leading-[1.4] font-medium">{summary}</p>
              </div>
            </div>
            <Button className="w-fit shrink-0" size="sm" variant="ghost">
              {cta}
              <ArrowRight />
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

interface Blog27Props {
  className?: string
}

const Blog27 = ({ className }: Blog27Props) => {
  return (
    <section className={cn('pb-32', className)}>
      <div className="bg-muted bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-[36rem] flex-col gap-8">
              <BreadcrumbBlog breadcrumb={BREADCRUMB} />
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  Best Blog Articles
                </h1>
                <p className="text-muted-foreground text-xl leading-[1.4]">
                  The best blog is one that captivates readers with engaging, well-researched
                  content presented in a clear and relatable way.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[27.5rem]">
            <BlogCard {...PRIMARY_POST} />
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            All Blogs
          </h2>
          <div>
            <BlogsResult posts={POSTS} categories={CATEGORIES} />
          </div>
        </div>
      </div>
    </section>
  )
}

export { Blog27 }
