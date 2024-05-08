import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(ScrollTrigger);
  const elementsToSplit = document.querySelectorAll('.split-lines');
  const instancesOfSplit: SplitType[] = [];

  function runSplit() {
    elementsToSplit.forEach((element: Element, index: number) => {
      // Change the type of 'element' parameter to 'Element'
      instancesOfSplit[index] = new SplitType(element as HTMLElement, {
        // Cast 'element' to 'HTMLElement'
        types: 'lines,words',
      });
    });
    document.querySelectorAll('.line').forEach((line: Element) => {
      // Update the type of 'line' parameter to 'Element'
      line.innerHTML += "<div class='line-mask'></div>";
    });
  }
  runSplit();

  let windowWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth;
      elementsToSplit.forEach((element, index) => {
        instancesOfSplit[index].revert();
      });
      runSplit();
      createAnimation();
    }
  });

  function createAnimation() {
    document.querySelectorAll('.line').forEach((line: Element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
      tl.to(line.querySelector('.line-mask'), {
        width: '0%',
        duration: 1,
      });
    });
  }
  createAnimation();
});
