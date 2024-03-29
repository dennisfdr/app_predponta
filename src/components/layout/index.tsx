import { ReactNode } from 'react';
import { Menu } from './menu'


interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <div  className="app">
      <div className="container column is-fullheigth">
      <Menu />
      </div>
   
      <section className="main-content columns is-fullheigth">
                
        <div className="container column is-fullheigth">
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
