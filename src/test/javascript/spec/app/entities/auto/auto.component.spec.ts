/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { MehanicarTestModule } from '../../../test.module';
import { AutoComponent } from '../../../../../../main/webapp/app/entities/auto/auto.component';
import { AutoService } from '../../../../../../main/webapp/app/entities/auto/auto.service';
import { Auto } from '../../../../../../main/webapp/app/entities/auto/auto.model';

describe('Component Tests', () => {

    describe('Auto Management Component', () => {
        let comp: AutoComponent;
        let fixture: ComponentFixture<AutoComponent>;
        let service: AutoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [MehanicarTestModule],
                declarations: [AutoComponent],
                providers: [
                    AutoService
                ]
            })
            .overrideTemplate(AutoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AutoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AutoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Auto(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.autos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
