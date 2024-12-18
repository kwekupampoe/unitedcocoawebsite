const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const mission = entry.target.querySelector('.mission-wrap');
  
      if (entry.isIntersecting) {
        mission.classList.add('mission-animation');
        return; // if we added the class, exit the function
      }
  
      // We're not intersecting, so remove the class!
      mission.classList.remove('mission-animation');
    });
  });
  
  observer.observe(document.querySelector('.mission-wrap'));