export const ParentGrid = ({ children, className = '' }) => {
    return (
        <div
          className={`container mx-auto max-w-screen-xl flex-grow ${className}`}
        >
            <div className="grid grid-cols-12 lg:gap-6">
              {children}
            </div>
        </div>
      )
}

export const GridEleven = ({ children, className = ''}) => {
  return (
    <div className={`lg:col-span-11 md:col-span-24 ${className}`}>
      {children}
    </div>
  )
}

// export const GridSeven = ({ children, className = ''}) => {
//   return (
//     <div className={`lg:col-span-9 md:col-span-12 col-span-12 ${className}`}>
//       {children}
//     </div>
//   )
// }

// export const GridSix = ({ children, className = ''}) => {
//     return (
//       <div className={`lg:col-span-8 md:col-span-12 col-span-12 ${className}`}>
//         {children}
//       </div>
//     )
//   }

export const GridSeven = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-7 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}

export const GridSix = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-6 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}

export const GridFive = ({ children, className = '' }) => {
  return (
    <div className={`lg:col-span-5 md:col-span-12 col-span-12 ${className}`}>
      {children}
    </div>
  )
}

export const GridFour = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-4 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}

export const GridThree = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-3 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}

export const GridTwo = ({ children, className = '' }) => {
    return (
      <div className={`lg:col-span-2 md:col-span-12 col-span-12 ${className}`}>
        {children}
      </div>
    )
}