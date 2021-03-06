import { ReactNode } from 'react';
import { Menu } from './menu'
import 'primereact/resources/themes/luna-amber/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div  className="app">
      <div className="container column is-10">
      <Menu />
      </div>
   
      <section className="main-content columns is-fullheigth">
                
        <div className="container column is-10">
          <div className="section">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  {props.titulo}
                  </p>
              </div>
              <div className="card-content">
                <div className="content">
                    {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
