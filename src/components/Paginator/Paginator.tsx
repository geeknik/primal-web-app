import { onCleanup, onMount } from "solid-js";
import styles from  "./Paginator.module.scss";

export default function Paginator(props: {
  loadNextPage: (() => void) | undefined,
  isSmall?: boolean,
}) {
  let observer: IntersectionObserver | undefined;

  onMount(() => {
    observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          props.loadNextPage && props.loadNextPage();
        }
      });
    });

    const pag = document.getElementById('pagination_trigger');

    pag && observer?.observe(pag);
  });

  onCleanup(() => {
    const pag = document.getElementById('pagination_trigger');

    pag && observer?.unobserve(pag);
  });

  return (
    <div id="pagination_trigger" class={props.isSmall ? styles.smallPaginator : styles.paginator}>
    </div>
  )
}
