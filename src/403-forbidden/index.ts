import { div, h2 } from 'compote/html';
import { setAnimation } from 'compote/css';

export const Forbidden = () => (
  div({
    className: 'container fade-in-animation',
    onbeforeremove: setAnimation('fade-out-animation')
  }, [
    div({ className: 'form' }, [
      h2('Грешка 403 - акаунтът Ви няма достъп до тази страница')
    ])
  ])
);
